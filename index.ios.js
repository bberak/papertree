import React, { Component } from "react";
import { AppRegistry } from "react-native";
import Login from "./app/components/login";
import Home from "./app/components/home";
import Main from "./app/components/main";
import { Scene, Router } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";
import DarkTheme from "./app/themes/dark";

EStyleSheet.build(DarkTheme);

export default class Papertree extends Component {
	render() {
		return (
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
						settingsOpen={false}
						selectedSearchId={null}
						searchTerm={""}
						filter={null}
					>
						<Scene key="main" component={Main} panHandlers={null} />
					</Scene>
				</Scene>
			</Router>
		);
	}
}

AppRegistry.registerComponent("papertree", () => Papertree);
