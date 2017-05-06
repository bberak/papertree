import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";

class SaveSearchActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ActionSheet.Form
        visible={this.props.visible}
        onBackdropPress={this.props.onClose}
        onClosed={this.props.onClosed}
        formContainerStyle={css.formContainer}
      >

        <ActionSheet.Title value={"Save the current search?"} />

        <ActionSheet.TextBox
          placeholder={"Name"}
          autoCorrect={false}
          returnKeyType={"done"}
          autoCapitalize={"none"}
          keyboardType={"default"}
          autoFocus={true}
        />

        <ActionSheet.Options leftValue={"Cancel"} onLeftPress={this.props.onClose} rightValue={"Save"} onRightPress={() => alert("Saved!")} />

      </ActionSheet.Form>
    );
  }
}

const css = EStyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    "@media (max-height: 650)": {
      justifyContent: "flex-start",
      marginTop: "20%"
    }
  }
});

export default SaveSearchActionSheet;
