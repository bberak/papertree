import React, { Component } from "react";
import Drawer from "react-native-drawer";
import Settings from "./settings";
import { Actions, DefaultRenderer } from "react-native-router-flux";

export default class Home extends Component {
    render() {
        const navigationState = this.props.navigationState;
        const children = navigationState.children;
        return (
            <Drawer
                ref="drawer"
                open={navigationState.settingsOpen}
                onOpen={() => Actions.refresh({ key: navigationState.key, settingsOpen: true })}
                onClose={() => Actions.refresh({ key: navigationState.key, settingsOpen: false })}
                type="static"
                content={<Settings />}
                openDrawerOffset={0.25}
                elevation={5}
                tapToClose={true}
                panOpenMask={0.2}
                panCloseMask={0.2}
            >
                <DefaultRenderer
                    navigationState={children[0]}
                    drawerState={navigationState}
                    onNavigate={this.props.onNavigate}
                />
            </Drawer>
        );
    }
}
