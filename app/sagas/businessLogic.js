import { delay } from "redux-saga";
import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import Api from "../utils/papertrailApi";
import Browser from "../utils/browser";
import { Actions as Navigation } from "react-native-router-flux";

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
	try {
		yield call(Api.saveSearch, searchName, searchTerm, filter);

		yield put({ type: "CLOSE_SAVE_SEARCH_ACTIONSHEET" });
	} catch (err) {
		console.log(err)
	}
}

export default function* businessLogic() {
	//-- Have to pause an arbitrary amount due do poor design in react-native-router-flux
	yield delay(1000);

	yield all([
		load(),
		takeLatest("LOGIN", login),
		takeLatest("CREATE_ACCOUNT", createAccount),
		takeLatest("LOGOUT", logout),
		takeLatest("SAVE_SEARCH", saveSearch)
	]);
}
