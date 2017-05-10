import React, { Component } from "react";
import Drawer from "react-native-drawer";
import Settings from "./settings";
import Filter from "./filter";
import { Actions, DefaultRenderer } from "react-native-router-flux";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const navigationState = this.props.navigationState;
    const children = navigationState.children;
    return (
      <Drawer
        open={navigationState.settingsOpen}
        onOpen={() => Actions.refresh({ key: "home", settingsOpen: true })}
        onClose={() => Actions.refresh({ key: "home", settingsOpen: false })}
        type={"static"}
        content={
          <Settings
            savedSearches={navigationState.savedSearches}
            selectedSearch={navigationState.selectedSearch}
          />
        }
        openDrawerOffset={0.25}
        tapToClose={true}
        panOpenMask={0.2}
        panCloseMask={0.2}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <Drawer
          open={navigationState.filterOpen}
          onOpen={() => Actions.refresh({ key: "home", filterOpen: true })}
          onClose={() => Actions.refresh({ key: "home", filterOpen: false })}
          type={"static"}
          content={
            <Filter
              savedSearches={navigationState.savedSearches}
              selectedSearch={navigationState.selectedSearch}
            />
          }
          openDrawerOffset={0.25}
          tapToClose={true}
          panOpenMask={0.2}
          panCloseMask={0.2}
          tweenHandler={Drawer.tweenPresets.parallax}
          side={"right"}
        >
          <DefaultRenderer
            navigationState={children[0]}
            {...navigationState}
            onNavigate={this.props.onNavigate}
          />
        </Drawer>
      </Drawer>
    );
  }
}
