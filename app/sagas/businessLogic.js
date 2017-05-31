import { delay } from "redux-saga";
import {
	put,
	takeEvery,
	all,
	call,
	takeLatest,
	select
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

	if (loggedIn) yield call(Navigation.home);

	yield put({ type: "LOADED" });
}

function* login({ email, password } = {}) {
	yield put({ type: "ATTEMPTING_LOGIN" });

	try {
		yield call(Api.login, email, password);

		yield call(Navigation.home);

		yield put({ type: "LOGIN_SUCCEEDED" });
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
	const { orientation, searchTerm, saveSearchActionSheetVisible, deleteSearchActionSheetVisible } = yield select();

	const bookmarkShouldShow = orientation === "portrait" &&
					Str.isNotNullOrWhiteSpace(searchTerm) &&
					saveSearchActionSheetVisible === false &&
					deleteSearchActionSheetVisible === false

	if (bookmarkShouldShow)
		yield put({ type: "SHOW_BOOKMARK" })
	else
		yield put({ type: "HIDE_BOOKMARK" })
}

export default function* businessLogic() {
	//-- Have to pause an arbitrary amount due do poor design in react-native-router-flux
	yield delay(1000);

	yield all([
		load(),
		takeLatest("LOGIN", login),
		takeLatest("CREATE_ACCOUNT", createAccount),
		takeLatest("LOGOUT", logout),
		takeLatest("SAVE_SEARCH", saveSearch),
		takeLatest("ON_LAYOUT", onLayout),
		takeLatest(
			[
				"OPEN_SAVE_SEARCH_ACTIONSHEET",
				"CLOSE_SAVE_SEARCH_ACTIONSHEET",
				"ORIENTATION_CHANGED",
				"SEARCH_TERM_CHANGED"
			],
			showOrHideBookmark
		)
	]);
}
