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

        <Text style={css.textStyle}>{this.props.label}</Text>

        <View style={css.switchContainer}>

          <Switch
            style={{ backgroundColor: "white", borderRadius: 19 }}
            onValueChange={this.props.onValueChange}
            value={this.props.value}
            //thumbTintColor={EStyleSheet.value("$primaryColor")}
            tintColor={EStyleSheet.value("$switchBorderColor")}
            //onTintColor={EStyleSheet.value("$secondaryColor")}
          />

        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.6%",
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "0.5%"
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  textStyle: {
    backgroundColor: "transparent",
    paddingLeft: "2%",
    fontSize: "$fontHeight"
  }
});

export default SwitchLabel;
