import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import Drawer from "react-native-drawer";
import Settings from "./settings";
import Filter from "./filter";
import { DefaultRenderer } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";

const shadowColor = "#000";
const width = EStyleSheet.value("100%", "width");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.props.dispatch({ type: "KEYBOARD_SHOWN"})
  }

  _keyboardDidHide = () => {
    this.props.dispatch({ type: "KEYBOARD_HIDDEN"})
  }

  render() {
    return (
      <View style={{flex: 1}} onLayout={() => this.props.dispatch({ type: "ON_LAYOUT"})}>
        <Drawer
          open={this.props.settingsOpen}
          onOpen={() => this.props.dispatch({ type: "OPEN_SETTINGS" })}
          onClose={() => this.props.dispatch({ type: "CLOSE_SETTINGS" })}
          type={"static"}
          content={<Settings />}
          openDrawerOffset={0.25}
          tapToClose={true}
          panOpenMask={0.2}
          panCloseMask={0.25}
          tweenHandler={Drawer.tweenPresets.parallax}
        >
          <Drawer
            open={this.props.filterOpen}
            onOpen={() => this.props.dispatch({ type: "OPEN_FILTER" })}
            onClose={() => this.props.dispatch({ type: "CLOSE_FILTER" })}
            type={"overlay"}
            content={<Filter />}
            openDrawerOffset={width > 320 ? 0.25 : 0.15}
            tapToClose={true}
            panOpenMask={0.2}
            panCloseMask={width > 320 ? 0.25 : 0.15}
            elevation={5}
            side={"right"}
            tweenHandler={ratio => {
              return {
                mainOverlay: {
                  opacity: 0.3 * ratio,
                  backgroundColor: shadowColor,
                  shadowOpacity: 1 * ratio
                }
              };
            }}
          >
            <DefaultRenderer
              navigationState={this.props.navigationState.children[0]}
              onNavigate={this.props.onNavigate}
            />
          </Drawer>
        </Drawer>
      </View>
    );
  }
}

export default connect(s => s)(Home);
