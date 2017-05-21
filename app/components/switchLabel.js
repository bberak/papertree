import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

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

        <View style={[css.borderContainer, this.props.borderContainerStyle]}>

          <Text style={css.textStyle}>{this.props.label}</Text>

          <View style={css.switchContainer}>

            <Switch
              style={{ backgroundColor: "#F9F9FA", borderRadius: 19 }}
              onValueChange={this.props.onValueChange}
              value={this.props.value}
              tintColor={EStyleSheet.value("$switchBorderColor")}
            />

          </View>

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
    paddingLeft: "5%"
  },
  borderContainer: {
    borderColor: "$filterItemBorderColor",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingRight: "5%",
    height: "8%"
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end",

  },
  textStyle: {
    backgroundColor: "transparent",
    fontSize: "$fontHeight",
    color: "$switchFontColor"
  }
});

export default SwitchLabel;
