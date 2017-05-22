import React, { Component } from "react";
import { View, Text, Switch, DatePickerIOS } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Collapsible from "react-native-collapsible";

class DatePickerAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDateChange = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <View>

        <View style={[css.borderContainer, this.props.borderContainerStyle]}>

          <Text style={css.labelStyle}>{this.props.label}</Text>

          <View style={css.switchContainer}>

            <Switch
              style={css.switchStyle}
              onValueChange={this.props.onOpenOrClose}
              value={this.props.open}
              tintColor={EStyleSheet.value("$switchBorderColor")}
            />

          </View>

        </View>

        <View style={css.accordionContainer}>

          <Collapsible collapsed={!this.props.open}>

            <DatePickerIOS
              date={this.props.date}
              mode="datetime"
              onDateChange={this.props.onDateChange}
              minuteInterval={5}
            />

          </Collapsible>

        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.6%",
  borderContainer: {
    borderColor: "$filterItemBorderColor",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: "5%",
    paddingRight: "5%",
    height: "8%"
  },
  labelStyle: {
    backgroundColor: "transparent",
    fontSize: "$fontHeight",
    color: "$switchFontColor"
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  switchStyle: {
    backgroundColor: "$filterBackgroundColor", 
    borderRadius: 19
  },
  accordionContainer: {
    marginHorizontal: "5%"
  }
});

export default DatePickerAccordion;
