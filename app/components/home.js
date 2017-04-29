import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Main from "./main";
import Drawer from "react-native-drawer";
import Settings from "./settings";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false,
      selectedSearch: null
    };
  }

  render() {
    return (
      <Drawer
        ref={"drawer"}
        content={
          <Settings
            selectedSearch={this.state.selectedSearch}
            onSelectedSearchChanged={s => this.setState({ selectedSearch: s })}
          />
        }
        type={"static"}
        openDrawerOffset={0.25}
        tapToClose={true}
        panOpenMask={0.2}
        open={this.state.settingsOpen}
        onOpenStart={() => {
          this.setState({
            settingsOpen: true
          });
        }}
        onCloseStart={() => {
          this.setState({
            settingsOpen: false
          });
        }}
      >
        <Main
          settingsOpen={this.state.settingsOpen}
          selectedSearch={this.state.selectedSearch}
          onSettingsPress={() => {
            this.setState({
              settingsOpen: !this.state.settingsOpen
            });
          }}
        />

      </Drawer>
    );
  }
}

const css = EStyleSheet.create({});

export default Home;
