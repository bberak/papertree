import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";

class DeleteSearchActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ActionSheet.Form
        visible={this.props.visible}
        onBackdropPress={this.props.onCancel}
        formContainerStyle={css.formContainer}
      >

        <ActionSheet.Title
          value={`Delete "${(this.props.selectedSearch || {}).name}"?`}
        />

        <ActionSheet.HR />

        <ActionSheet.Option
          value={this.props.deleting ? "Deleting.." : this.props.deleteFailed ? "Try Again" : "Delete"}
          disabled={this.props.deleting}
          textStyle={css.deleteOptionTextStyle}
          onPress={this.props.onDelete}
        />

        <ActionSheet.Button value={"Cancel"} onPress={this.props.onCancel} />

      </ActionSheet.Form>
    );
  }
}

const css = EStyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  deleteOptionTextStyle: {
    color: "$warningColor"
  }
});

export default DeleteSearchActionSheet;
