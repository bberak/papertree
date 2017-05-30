import React, { Component } from "react";
import { AppRegistry } from "react-native";
import Login from "./app/components/login";
import Home from "./app/components/home";
import Main from "./app/components/main";
import { Scene, Router, Actions } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";
import DarkTheme from "./app/themes/dark";

EStyleSheet.build(DarkTheme);

import { createStore, applyMiddleware } from "redux";
import createSageMiddleware from "redux-saga";
import businessLogic from "./app/sagas/businessLogic";
import { connect, Provider } from "react-redux";

const initState = {
	loading: true,
	attemptingLogin: false,
	loginFailed: false,
	loggedIn: false,
	saveSearchActionSheetVisible: false
};

const reducer = (state = initState, action = {}) => {
	switch (action.type) {
		case "LOADED": return { ...state, loading: false };
		case "ATTEMPTING_LOGIN": return { ...state, attemptingLogin: true, loginFailed: false }
		case "LOGIN_FAILED": return { ...state, attemptingLogin: false, loginFailed: true }
		case "LOGIN_SUCCEEDED": return { ...state, attemptingLogin: false, loginFailed: false, loggedIn: true }
		case "LOGGED_OUT": return { ...state, loggedIn: false }
		case "OPEN_SAVE_SEARCH_ACTIONSHEET": return { ...state, saveSearchActionSheetVisible: true }
		case "CLOSE_SAVE_SEARCH_ACTIONSHEET": return { ...state, saveSearchActionSheetVisible: false }
		default: return state;
	}
};

const sagaMiddleware = createSageMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(businessLogic);

export default class Papertree extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Scene key="root">
						<Scene
							key="login"
							component={Login}
							hideNavBar={true}
							direction={"vertical"}
							panHandlers={null}
						/>

						<Scene
							key="home"
							component={Home}
							hideNavBar={true}
							direction={"vertical"}
							//panHandlers={null}
							//settingsOpen={false}
							//selectedSearch={null}
							//searchTerm={""}
							//filter={null}
							//savedSearches={[]}
							//selectedEvent={null}
						>
							<Scene
								key="main"
								component={Main}
								panHandlers={null}
							/>
						</Scene>
					</Scene>
				</Router>
			</Provider>
		);
	}
}

AppRegistry.registerComponent("papertree", () => Papertree);
