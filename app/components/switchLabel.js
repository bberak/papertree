import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import Collapsible from "react-native-collapsible";

class SwitchLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      date: new Date()
    };
  }

  onDateChange = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <View style={css.container}>

        <Text>{this.props.label}</Text>

        <Switch
            onValueChange={this.props.onValueChange}
            value={this.props.value}
          />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SwitchLabel;
