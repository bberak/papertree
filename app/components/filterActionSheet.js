import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";

class FilterActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByStartTime: false,
      startDate: new Date(),
      filterByEndTime: false,
      endDate: new Date(),
      system: {},
      group: {}
    };
  }

  filter = async () => {
    alert("Apply Filter")
  };

  onClosed = () => {
    let action = this.state.pendingAction;

    if (action) action();

    if (this.props.onClosed) this.props.onClosed();
  };

  render() {
    return (
      <ActionSheet.Form
        visible={this.props.visible}
        onBackdropPress={this.props.onClose}
        onClosed={this.onClosed}
        formContainerStyle={css.formContainer}
      >

        <ActionSheet.Title value={"Filter"} />

        <ActionSheet.HR />

        <Animatable.View ref="textBoxContainer">
          <ActionSheet.TextBox
            placeholder={"Name"}
            autoCorrect={false}
            returnKeyType={"done"}
            autoCapitalize={"none"}
            keyboardType={"default"}
            autoFocus={false}
            value={this.state.searchName}
            onChangeText={text => this.setState({ searchName: text })}
          />
        </Animatable.View>

        <ActionSheet.HR />

        <ActionSheet.Option
          value={"Apply"}
          onPress={this.filter}
        />

        <ActionSheet.Button value={"Cancel"} onPress={this.props.onClose} />

      </ActionSheet.Form>
    );
  }
}

const css = EStyleSheet.create({
  formContainer: {
  
  }
});

export default FilterActionSheet;
