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
import * as Help from "../utils/help"; 

function* load() {
	yield call(Navigation.login);

	let loggedIn = yield call(Api.isLoggedIn);

	if (loggedIn) {
		yield put({ type: "LOGIN_SUCCEEDED" });

		yield put({ type: "SHOW_HOME_SCREEN" });
	} else yield put({ type: "SHOW_LOGIN_SCREEN" });
}

function* showHomeScreen() {
	yield call(Navigation.home);

	yield all([
		put({ type: "SEARCH_SUBMITTED", override: true }),
		put({ type: "REFRESH_SAVED_SEARCHES" })
	]);
}

function* showLoginScreen() {
	yield put({ type: "LOADED" });

	yield call(Navigation.login);
}

function* login({ email, password } = {}) {
	yield put({ type: "ATTEMPTING_LOGIN" });

	try {
		yield call(Api.login, email, password);

		yield put({ type: "LOGIN_SUCCEEDED" });

		yield put({ type: "SHOW_HOME_SCREEN" });
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
		let result = yield call(
			Api.saveSearch,
			_.trim(searchName),
			searchTerm,
			filter
		);

		yield put({ type: "SAVE_SEARCH_SUCCEEDED", newSearch: result });
	} catch (err) {
		console.log(err);

		yield put({ type: "SAVE_SEARCH_FAILED" });
	}
}

function* deleteSearch(){
	const selectedSearch = yield select(s => s.selectedSearch)

	if (selectedSearch) {
		yield put({ type: "DELETING_SEARCH" });

		try {
			yield call(Api.deleteSearch, selectedSearch.id);

			yield put({ type: "DELETE_SEARCH_SUCCEEDED", deletedSearch: selectedSearch })

			yield put({ type: "SEARCH_SUBMITTED"})
		} catch (err) {
			console.log(err);

			yield put({ type: "DELETE_SEARCH_FAILED" });
		}
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
	yield put({ type: "SEARCH_TERM_CHANGED", searchTerm: "" });

	yield put({ type: "SEARCH_SUBMITTED" });
}

function* search({ override }) {
	const { searchTerm, lastSearch, filter } = yield select();

	if (_.trim(searchTerm) !== _.trim(lastSearch) || override === true) {
		yield put({
			type: "SEARCHING",
			lastSearch: searchTerm
		});

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

function* refreshSavedSearches() {
	yield put({ type: "REFRESHING_SAVED_SEARCHES" });

	try {
		let results = yield call(Api.listSearches);

		yield put({
			type: "REFRESHING_SAVED_SEARCHES_SUCCEEDED",
			savedSearches: results
		});
	} catch (error) {
		console.log(error);

		yield put({ type: "REFRESHING_SAVED_SEARCHES_FAILED" });
	}
}

function* selectSearch({ selectedSearch }) {
	let current = yield select(s => s.selectedSearch);

	current = current || {};
	selectedSearch = selectedSearch || {};

	if (current.id === selectedSearch.id) {
		yield put({ type: "SELECTED_SEARCH_CLEARED" });
		yield put({ type: "SEARCH_SUBMITTED"});
	} else {
		yield put({ type: "SEARCH_SELECTED", selectedSearch: selectedSearch });
		yield put({ type: "SEARCH_SUBMITTED"});
	}
}

function* checkIfSearchShouldBeCleared() {
	const { selectedSearch, lastSearch, filter} = yield select();

	if (selectedSearch) {
		let selectedSearchFilter = { groupId: selectedSearch.group.id, groupName: selectedSearch.groupName };
		let outOfSync = _.trim(selectedSearch.query) !== _.trim(lastSearch) || Help.areFiltersDifferent(filter, selectedSearchFilter)

		if (outOfSync) {
			yield put({ type: "SELECTED_SEARCH_OUT_OF_SYNC" });
		}
	}
}

export default function* businessLogic() {
	//-- Have to pause an arbitrary amount due do poor design in react-native-router-flux
	yield delay(1000);

	yield all([
		load(),
		takeLatest("LOGIN", login),
		takeLatest("SHOW_HOME_SCREEN", showHomeScreen),
		takeLatest("SHOW_LOGIN_SCREEN", showLoginScreen),
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
				"SEARCH_SUCCEEDED",
				"SAVE_SEARCH_SUCCEEDED",
				"DELETE_SEARCH_SUCCEEDED"
			],
			showOrHideBookmark
		),
		takeLatest("OPEN_ACTIONSHEET", openActionSheet),
		takeLatest("SEARCH_TERM_CLEARED", clear),
		throttle(1000, "SEARCH_SUBMITTED", search),
		takeLatest("END_REACHED", endReached),
		takeLatest("REFRESH", refresh),
		takeLatest("REFRESH_SAVED_SEARCHES", refreshSavedSearches),
		takeLatest(
			[
				"SEARCH_TERM_CLEARED", 
				"FILTER_CHANGED", 
				"SEARCHING"
			],
			checkIfSearchShouldBeCleared
		),

		takeLatest("SELECT_SEARCH", selectSearch),
		takeLatest("DELETE_SEARCH", deleteSearch)
	]);
}
