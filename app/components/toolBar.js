import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import TextBox from "./textBox";
import Button from "./button";
import Label from "./label";
import Link from "./link";
import Browser from "../utils/browser";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      connecting: false
    };
  }

  onTryLogin = async () => {
    if (this.state.email && this.state.password) {
      try {
        this.setState({ connecting: true });
        await api.login(this.state.email, this.state.password);
        Actions.home();
      } catch (error) {
        this.setState({ connecting: false });
        this.refs.textBoxes.shake(400);
      }
    } else this.refs.textBoxes.shake(400);
  };

  onCreateAccount = () => {
    Browser.openURL("https://papertrailapp.com/signup?plan=free");
  };

  render() {
    return (
      <View style={css.container}>

        <View style={css.button} />

        <TextBox placeholder={"Search"} />

        <View style={css.button} />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    //paddingTop: (StatusBar.currentHeight || 20) + 5,
    flexDirection: "row",
    //flex: 1,
    //paddingBottom: 5,
    backgroundColor: "red"
  },
  $inputHeight: "7.76%",
  button: {
    height: "$inputHeight",
    width: "$inputHeight",
    borderRadius: "$inputHeight",
    backgroundColor: "#FFF",
    marginTop: 10,
    marginBottom: 10
  }
});

export default ToolBar;
