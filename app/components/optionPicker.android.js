import React, { Component } from "react";
import {
  View,
  Text,
  Switch,
  Picker,
  TouchableWithoutFeedback
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";

class OptionPicker extends Component {
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
      <View style={css.container}>

        <Picker
          selectedValue={(this.props.value || {}).id}
          onValueChange={this.props.onValueChange}
        >
          {items}
        </Picker>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    borderColor: "$filterItemBorderColor",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    height: "8%"
  }
});

export default OptionPicker;
