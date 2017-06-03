import { delay } from "redux-saga";
import {
	put,
	takeEvery,
	all,
	call,
	takeLatest,
	select,
	throttle,
	take
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
		put({ type: "SEARCH_SUBMITTED", initialSearch: true }),
		put({ type: "REFRESH_SAVED_SEARCHES" }),
		put({ type: "REFRESH_SYSTEMS_AND_GROUPS" })
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

function* deleteSearch() {
	const selectedSearch = yield select(s => s.selectedSearch);

	if (selectedSearch) {
		yield put({ type: "DELETING_SEARCH" });

		try {
			yield call(Api.deleteSearch, selectedSearch.id);

			yield put({
				type: "DELETE_SEARCH_SUCCEEDED",
				deletedSearch: selectedSearch
			});
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
		saveSearchActionSheetVisible,
		deleteSearchActionSheetVisible,
		keyboardVisible,
		searchTerm
	} = yield select();

	const bookmarkShouldShow =
		orientation === "portrait" &&
		Str.isNotNullOrWhiteSpace(searchTerm) &&
		saveSearchActionSheetVisible === false &&
		deleteSearchActionSheetVisible === false &&
		keyboardVisible == false;

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
}

function* search({ initialSearch }) {
	const { searchTerm, lastSearch, filter, lastFilter } = yield select();

	if (
		_.trim(searchTerm) !== _.trim(lastSearch) ||
		Help.areFiltersDifferent(filter, lastFilter) ||
		initialSearch === true
	) {
		yield put({
			type: "SEARCHING"
		});

		try {
			let results = yield call(Api.search, _.trim(searchTerm), filter);

			yield put({
				type: "SEARCH_SUCCEEDED",
				events: results.events || [],
				lastSearch: searchTerm,
				lastFilter: filter
			});
		} catch (error) {
			console.log(error);

			yield put({ type: "SEARCH_FAILED" });
		}
	}
}

function* endReached() {
	const { lastSearch, lastFilter, events } = yield select();

	if (events && events.length > 0) {
		try {
			let maxId = _.minBy(events, "id").id; //-- Searching tail, therefore min id becomes the max param
			let results = yield call(
				Api.search,
				lastSearch,
				lastFilter,
				null,
				maxId
			);

			yield put({
				type: "SEARCH_SUCCEEDED",
				events: _.uniqBy((events || []).concat(results.events || [])),
				lastSearch: lastSearch,
				lastFilter: lastFilter
			});
		} catch (error) {
			console.log(error);
		}
	}
}

function* refresh() {
	yield put({ type: "REFRESHING" });

	const { lastSearch, lastFilter, events } = yield select();

	try {
		let minId = events && events.length > 0
			? _.maxBy(events, "id").id //-- Searching head, therefore max id becomes the min param
			: null;
		let limit = minId ? 10000 : 20; //-- Try get as many events as you can - avoids polling
		let results = yield call(
			Api.search,
			lastSearch,
			lastFilter,
			minId,
			null,
			limit
		);

		yield put({
			type: "SEARCH_SUCCEEDED",
			events: _.uniqBy((events || []).concat(results.events || [])),
			lastSearch: lastSearch,
			lastFilter: lastFilter
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

	if (current.id === selectedSearch.id)
		yield put({ type: "SELECTED_SEARCH_CLEARED" });
	else yield put({ type: "SEARCH_SELECTED", selectedSearch: selectedSearch });
}

function* checkIfSelectedSearchShouldBeCleared() {
	const { selectedSearch, lastSearch, lastFilter } = yield select();

	if (selectedSearch) {
		let selectedSearchFilter = {
			groupId: selectedSearch.group.id,
			groupName: selectedSearch.groupName
		};
		let outOfSync =
			_.trim(selectedSearch.query) !== _.trim(lastSearch) ||
			Help.areFiltersDifferent(selectedSearchFilter, lastFilter);

		if (outOfSync) {
			yield put({ type: "SELECTED_SEARCH_OUT_OF_SYNC" });
		}
	}
}

function* refreshSystemsAndGroups() {
	yield put({ type: "REFRESHING_SYSTEMS_AND_GROUPS" });

	try {
		let results = yield all([call(Api.listGroups), call(Api.listSystems)]);

		let groups = results[0] || [];
		let systems = [{ name: "Any" }].concat(results[1] || []);

		yield put({
			type: "REFRESHING_SYSTEMS_AND_GROUPS_SUCCEEDED",
			groups: groups,
			systems: systems
		});
	} catch (error) {
		console.log(error);

		yield put({ type: "REFRESHING_SYSTEMS_AND_GROUPS_FAILED" });
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
				"KEYBOARD_SHOWN",
				"KEYBOARD_HIDDEN",
				"SEARCHING",
				"SEARCH_SUCCEEDED"
			],
			showOrHideBookmark
		),
		takeLatest("OPEN_ACTIONSHEET", openActionSheet),
		takeLatest("SEARCH_TERM_CLEARED", clear),
		takeLatest(
			[
				"SEARCH_SUBMITTED",
				"SEARCH_TERM_CLEARED",
				"APPLY_FILTER",
				"SEARCH_SELECTED",
				"SELECTED_SEARCH_CLEARED",
				"DELETE_SEARCH_SUCCEEDED"
			],
			search
		),
		takeLatest("END_REACHED", endReached),
		takeLatest("REFRESH", refresh),
		takeLatest("REFRESH_SAVED_SEARCHES", refreshSavedSearches),
		takeLatest("SEARCHING", checkIfSelectedSearchShouldBeCleared),
		takeLatest("SELECT_SEARCH", selectSearch),
		takeLatest("DELETE_SEARCH", deleteSearch),
		takeLatest("REFRESH_SYSTEMS_AND_GROUPS", refreshSystemsAndGroups)
	]);
}
