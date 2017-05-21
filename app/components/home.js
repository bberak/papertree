import React, { Component } from "react";
import Drawer from "react-native-drawer";
import Settings from "./settings";
import Filter from "./filter";
import { Actions, DefaultRenderer } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";

const shadowColor = "#000";

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
        panCloseMask={0.25}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <Drawer
          open={navigationState.filterOpen}
          onOpen={() => Actions.refresh({ key: "home", filterOpen: true })}
          onClose={() => Actions.refresh({ key: "home", filterOpen: false })}
          type={"overlay"}
          content={
            <Filter
              savedSearches={navigationState.savedSearches}
              selectedSearch={navigationState.selectedSearch}
            />
          }
          openDrawerOffset={0.25}
          tapToClose={true}
          panOpenMask={0.2}
          panCloseMask={0.25}
          elevation={5}
          side={"right"}
          closedDrawerOffset={-5}
          tweenHandler={(ratio) => {
            return {
              mainOverlay: { 
                opacity: ratio * 0.3, 
                backgroundColor: shadowColor
              }
            }
          }}
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
