import React, { Component } from "react";
import { View, Text, Switch, DatePickerIOS } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Collapsible from "react-native-collapsible";
import { DatePicker } from "react-native-wheel-picker-android";

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
              thumbTintColor={EStyleSheet.value("$buttonColor")}
              tintColor={EStyleSheet.value("$filterItemBorderColor")}
              onTintColor={EStyleSheet.value("$androidSwitchThumbColor")}
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

            <View style={css.accordionContainer2}>

              <DatePicker
                startDate={new Date(2000, 12, 12).toISOString()}
                initDate={(this.props.date || new Date()).toISOString()}
                onDateSelected={this.props.onDateChange}
              />

            </View>

          </View>

        </Collapsible>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.6%",
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
    fontSize: "$fontHeight",
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
    marginLeft: "5%",
    borderColor: "$filterItemBorderColor"
  },
  accordionContainer2: {
    marginRight: "5%",
    paddingVertical: "5%"
  }
});

export default DatePickerAccordion;
