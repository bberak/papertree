import React, { Component } from "react";
import {
  View,
  Text,
  Switch,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  TimePickerAndroid
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Collapsible from "react-native-collapsible";
import * as Animatable from "react-native-animatable";

class DatePickerAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  openTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  onDatePressIn = () => {
    this.refs.dateContainer.transitionTo({
      backgroundColor: EStyleSheet.value(
        "$filterValueButtonBackgroundColorPressed"
      )
    });

    this.refs.date.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColorPressed")
    });
  };

  onDatePressOut = () => {
    this.refs.dateContainer.transitionTo({
      backgroundColor: EStyleSheet.value("$filterValueButtonBackgroundColor")
    });

    this.refs.date.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColor")
    });
  };

  onDatePress = () => {
    alert("Date Pressed");
  };

 onTimePressIn = () => {
    this.refs.timeContainer.transitionTo({
      backgroundColor: EStyleSheet.value(
        "$filterValueButtonBackgroundColorPressed"
      )
    });

    this.refs.time.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColorPressed")
    });
  };

  onTimePressOut = () => {
    this.refs.timeContainer.transitionTo({
      backgroundColor: EStyleSheet.value("$filterValueButtonBackgroundColor")
    });

    this.refs.time.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColor")
    });
  };

  onTimePress = () => {
    alert("Time Pressed");
  };

  render() {
    return (
      <View>

        <View
          style={[
            css.borderContainer,
            { borderBottomWidth: this.props.lastItem ? 0 : 0.5 }
          ]}
        >

          <Text style={css.labelStyle}>{this.props.label}</Text>

          <View style={css.switchContainer}>

            <Switch
              style={css.switchStyle}
              onValueChange={this.props.onOpenOrClose}
              value={this.props.open}
              thumbTintColor={
                this.props.thumbTintColor || EStyleSheet.value("$buttonColor")
              }
              tintColor={EStyleSheet.value("$filterItemBorderColor")}
              onTintColor={
                this.props.onTintColor ||
                  EStyleSheet.value("$androidSwitchOnTintColor")
              }
            />

          </View>

        </View>

        <Collapsible collapsed={!this.props.open}>

          <View
            style={[
              css.accordionContainer,
              {
                borderTopWidth: this.props.open && this.props.lastItem
                  ? 0.5
                  : 0,
                borderBottomWidth: this.props.open &&
                  this.props.lastItem != true
                  ? 0.5
                  : 0
              }
            ]}
          >

            <TouchableWithoutFeedback
              onPress={this.onDatePress}
              onPressIn={this.onDatePressIn}
              onPressOut={this.onDatePressOut}
            >

              <Animatable.View
                ref={"dateContainer"}
                style={css.valueTextContainer}
              >
                <Animatable.Text ref={"date"} style={css.valueText}>
                  {"2017-12-03".toUpperCase()}
                </Animatable.Text>
              </Animatable.View>

            </TouchableWithoutFeedback>

            <Text style={css.valueText}> - </Text>

            <TouchableWithoutFeedback
              onPress={this.onTimePress}
              onPressIn={this.onTimePressIn}
              onPressOut={this.onTimePressOut}
            >

              <Animatable.View
                ref={"timeContainer"}
                style={css.valueTextContainer}
              >
                <Animatable.Text ref={"time"} style={css.valueText}>
                  {"5: 43 PM".toUpperCase()}
                </Animatable.Text>
              </Animatable.View>

            </TouchableWithoutFeedback>

          </View>

        </Collapsible>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $labelFontHeight: "2.6%",
  $valueFontHeight: "2.3%",
  borderContainer: {
    borderColor: "$filterItemBorderColor",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: "5%",
    paddingRight: "5%",
    height: "8%"
  },
  labelStyle: {
    backgroundColor: "transparent",
    fontSize: "$labelFontHeight",
    color: "$switchFontColor"
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  switchStyle: {
    backgroundColor: "transparent"
  },
  accordionContainer: {
    borderColor: "$filterItemBorderColor",
    marginLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: "5%",
    justifyContent: "flex-end",
    height: "8%"
  },
  valueTextContainer: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: "$filterValueButtonBackgroundColor"
  },
  valueText: {
    fontSize: "$valueFontHeight",
    color: "$filterValueButtonFontColor",
    fontWeight: "500"
  }
});

export default DatePickerAccordion;
