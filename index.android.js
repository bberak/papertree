import React, { Component } from "react";
import { AppRegistry } from "react-native";
import Login from "./app/components/login";
import Home from "./app/components/home";
import Main from "./app/components/main";
import { Scene, Router, Actions } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";
import DarkTheme from "./app/themes/dark";
import { createStore, applyMiddleware } from "redux";
import createSageMiddleware from "redux-saga";
import businessLogic from "./app/sagas/businessLogic";
import reducer from "./app/reducers/coreReducer";
import { connect, Provider } from "react-redux";

EStyleSheet.build(DarkTheme);

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
							panHandlers={null}
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
