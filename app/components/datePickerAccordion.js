import React, { Component } from "react";
import { View, Text, Switch, DatePickerIOS } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Collapsible from "react-native-collapsible";

class DatePickerAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              tintColor={EStyleSheet.value("$switchBorderColor")}
              onTintColor={
                this.props.onTintColor ||
                  EStyleSheet.value("$iosSwitchOnTintColor")
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

            <DatePickerIOS
              date={this.props.date}
              mode="datetime"
              onDateChange={this.props.onDateChange}
              minuteInterval={5}
            />

          </View>

        </Collapsible>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.6%",
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
    marginLeft: "5%",
    paddingRight: "5%",
    borderColor: "$filterItemBorderColor"
  }
});

export default DatePickerAccordion;
