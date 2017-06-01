import { delay } from "redux-saga";
import {
	put,
	takeEvery,
	all,
	call,
	takeLatest,
	select,
	throttle
} from "redux-saga/effects";
import Api from "../utils/papertrailApi";
import Browser from "../utils/browser";
import { Actions as Navigation } from "react-native-router-flux";
import _ from "lodash";
import { Dimensions } from "react-native";
import * as Str from "../utils/str";

function* load() {
	yield call(Navigation.login);

	let loggedIn = yield call(Api.isLoggedIn);

	if (loggedIn) {
		//yield put({ type: "LOGIN_SUCCEEDED" });

		//yield put({type: "HOME" });

		yield call(Navigation.home);
	}

	yield put({ type: "LOADED" });
}

function* home() {
	yield call(Navigation.home);

	//yield put({ type: "SEARCH_SUBMITTED", searchTerm: ""})
}

function* login({ email, password } = {}) {
	yield put({ type: "ATTEMPTING_LOGIN" });

	try {
		yield call(Api.login, email, password);

		yield put({ type: "LOGIN_SUCCEEDED" });

		yield put({type: "HOME" });
	} catch (err) {
		console.log(err);

		yield put({ type: "LOGIN_FAILED" });
	}
}

function* createAccount() {
	Browser.openURL("https://papertrailapp.com/signup?plan=free");
}

function* logout() {
	try {
		yield call(Api.logout);
	} catch (err) {
		console.log(err);
	}

	yield call(Navigation.pop);

	yield put({ type: "LOGGED_OUT" });
}

function* saveSearch({ searchName, searchTerm, filter }) {
	yield put({ type: "SAVING_SEARCH" });

	try {
		yield call(Api.saveSearch, _.trim(searchName), searchTerm, filter);

		yield put({ type: "SAVE_SEARCH_SUCCEEDED" });
	} catch (err) {
		console.log(err);

		yield put({ type: "SAVE_SEARCH_FAILED" });
	}
}

function* onLayout() {
	const current = yield select(x => x.orientation);
	const dims = Dimensions.get("window");
	const next = dims.height > dims.width ? "portrait" : "landscape";

	if (current !== next)
		yield put({ type: "ORIENTATION_CHANGED", orientation: next });
}

function* showOrHideBookmark() {
	const {
		orientation,
		lastSearch,
		saveSearchActionSheetVisible,
		deleteSearchActionSheetVisible
	} = yield select();

	const bookmarkShouldShow =
		orientation === "portrait" &&
		Str.isNotNullOrWhiteSpace(lastSearch) &&
		saveSearchActionSheetVisible === false &&
		deleteSearchActionSheetVisible === false;

	if (bookmarkShouldShow) yield put({ type: "SHOW_BOOKMARK" });
	else yield put({ type: "HIDE_BOOKMARK" });
}

function* openActionSheet() {
	const selectedSearch = yield select(s => s.selectedSearch);

	if (selectedSearch) yield put({ type: "OPEN_DELETE_SEARCH_ACTIONSHEET" });
	else yield put({ type: "OPEN_SAVE_SEARCH_ACTIONSHEET" });
}

function* clear() {
	yield put({ type: "SEARCH_TERM_CHANGED", searchTerm: "" })

	yield put({ type: "SEARCH_SUBMITTED" });
}

function* search() {
	const { searchTerm, lastSearch, filter } = yield select();

	console.log("search")

	if (_.trim(searchTerm) !== _.trim(lastSearch)) {
		yield put({ type: "SEARCHING", lastSearch: searchTerm });

		try {
			let results = yield call(Api.search, _.trim(searchTerm), filter);

			yield put({
				type: "SEARCH_SUCCEEDED",
				events: results.events || []
			});
		} catch (error) {
			console.log(error);

			yield put({ type: "SEARCH_FAILED" });
		}
	}
}

function* endReached({ lastSearch, filter, events }) {
	if (events && events.length > 0) {
		try {
			let maxId = _.minBy(events, "id").id; //-- Searching tail, therefore min id becomes the max param
			let results = yield call(
				Api.search,
				lastSearch,
				filter,
				null,
				maxId
			);

			yield put({
				type: "SEARCH_SUCCEEDED",
				events: _.uniqBy((events || []).concat(results.events || []))
			});
		} catch (error) {
			console.log(error);
		}
	}
}

function* refresh({ lastSearch, filter, events }) {
	yield put({ type: "REFRESHING" });

	try {
		let minId = events && events.length > 0
			? _.maxBy(events, "id").id //-- Searching head, therefore max id becomes the min param
			: null;
		let limit = 10000; //-- Try get as many events as you can - avoids polling
		let results = yield call(
			Api.search,
			lastSearch,
			filter,
			minId,
			null,
			limit
		);

		yield put({
			type: "SEARCH_SUCCEEDED",
			events: _.uniqBy((events || []).concat(results.events || []))
		});
	} catch (error) {
		console.log(error);

		yield put({ type: "SEARCH_FAILED" });
	}
}

export default function* businessLogic() {
	//-- Have to pause an arbitrary amount due do poor design in react-native-router-flux
	yield delay(1000);

	yield all([
		load(),
		takeLatest("LOGIN", login),
		takeLatest("HOME", home),
		takeLatest("CREATE_ACCOUNT", createAccount),
		takeLatest("LOGOUT", logout),
		takeLatest("SAVE_SEARCH", saveSearch),
		takeLatest("ON_LAYOUT", onLayout),
		takeLatest(
			[
				"OPEN_SAVE_SEARCH_ACTIONSHEET",
				"CLOSE_SAVE_SEARCH_ACTIONSHEET",
				"OPEN_DELETE_SEARCH_ACTIONSHEET",
				"CLOSE_DELETE_SEARCH_ACTIONSHEET",
				"ORIENTATION_CHANGED",
				"SEARCH_SUBMITTED",
				"SEARCH_TERM_CLEARED",
				"SEARCHING",
				"SEARCH_SUCCEEDED"
			],
			showOrHideBookmark
		),
		takeLatest("OPEN_ACTIONSHEET", openActionSheet),
		takeLatest("SEARCH_TERM_CLEARED", clear),
		throttle(1000, "SEARCH_SUBMITTED", search),
		takeLatest("END_REACHED", endReached),
		takeLatest("REFRESH", refresh)
	]);
}
