import React, { Component } from "react";
import {
  View,
  Text,
  Switch,
  Picker,
  TouchableWithoutFeedback
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Collapsible from "react-native-collapsible";
import * as Animatable from "react-native-animatable";

class OptionAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDateChange = date => {
    this.setState({ date: date });
  };

  onPressIn = () => {
    this.refs.valueContainer.transitionTo({
      backgroundColor: EStyleSheet.value(
        "$filterValueButtonBackgroundColorPressed"
      )
    });

    this.refs.value.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColorPressed")
    });
  };

  onPressOut = () => {
    this.refs.valueContainer.transitionTo({
      backgroundColor: EStyleSheet.value("$filterValueButtonBackgroundColor")
    });

    this.refs.value.transitionTo({
      color: EStyleSheet.value("$filterValueButtonFontColor")
    });
  };

  onPress = () => {
    const canOpen = this.props.values && this.props.values.length > 0;

    if (canOpen && this.props.onOpenOrClose)
      this.props.onOpenOrClose(!this.props.open);
  };

  render() {
    var items = this.props.values && this.props.values.length > 0
      ? this.props.values.map((x, i) => {
          return <Picker.Item key={i} label={x.name} value={x.id} />;
        })
      : null;

    var selectedValue = this.props.value || { name: "Default" };

    return (
      <View>

        <View style={[css.borderContainer, this.props.borderContainerStyle]}>

          <Text style={css.labelStyle}>{this.props.label}</Text>

          <View style={css.valueContainer}>

            <TouchableWithoutFeedback
              onPress={this.onPress}
              onPressIn={this.onPressIn}
              onPressOut={this.onPressOut}
            >

              <Animatable.View
                ref={"valueContainer"}
                style={css.valueTextContainer}
              >
                <Animatable.Text ref={"value"} style={css.valueText}>
                  {selectedValue.name.toUpperCase()}
                </Animatable.Text>
              </Animatable.View>

            </TouchableWithoutFeedback>

          </View>

        </View>

        <View style={css.accordionContainer}>

          <Collapsible collapsed={!this.props.open}>

            <Picker
              selectedValue={(this.props.value || {}).id}
              onValueChange={this.props.onValueChange}
            >
              {items}
            </Picker>

          </Collapsible>

        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $labelFontHeight: "2.6%",
  $valueFontHeight: "1.65%",
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
    fontSize: "$labelFontHeight",
    color: "$switchFontColor"
  },
  valueContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  valueTextContainer: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: "$filterValueButtonBackgroundColor"
  },
  valueText: {
    fontSize: "$valueFontHeight",
    color: "$filterValueButtonFontColor",
    fontWeight: "600"
  },
  accordionContainer: {
    marginHorizontal: "5%"
  }
});

export default OptionAccordion;
