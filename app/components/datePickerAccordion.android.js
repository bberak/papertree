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
import moment from "moment";

class DatePickerAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  onDatePress = async () => {
    const date = this.props.date || new Date();

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: date
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);

        if (this.props.onDateChange)
          this.props.onDateChange(date);
      }
    } catch ({ code, message }) {
      console.log("Cannot open date picker", message);
    }
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

  onTimePress = async () => {
    const date = this.props.date || new Date();

    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: date.getHours(),
        minute: date.getMinutes(),
        is24Hour: false
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        date.setHours(hour);
        date.setMinutes(minute);

        if (this.props.onDateChange)
          this.props.onDateChange(date);
      }
    } catch ({ code, message }) {
      console.log("Cannot open time picker", message);
    }
  };

  render() {
    const date = this.props.date || new Date();
    const m = moment(date);
    return (
      <View style={css.container}>

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
                  {m.format("YYYY-MMM-DD")}
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
                  {m.format("h:mm a")}
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
  container: {
    backgroundColor: "$secionContainerBackgroundColor"
  },
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
    fontWeight: "400"
  }
});

export default DatePickerAccordion;
