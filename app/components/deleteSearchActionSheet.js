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
      label: "Delete",
      disabled: false,
      pendingAction: null
    };
  }

  delete = async () => {
    this.setState({
      label: "Deleting..",
      disabled: true
    });
    try {
      await api.deleteSearch(this.props.selectedSearch.id);

      this.setState({
        pendingAction: () => {
          Actions.refresh({
            key: "home",
            selectedSearch: null,
            searchTerm: null,
            filter: null,
            savedSearches: (this.props.savedSearches || [])
              .filter(x => x.id !== this.props.selectedSearch.id)
          });
        }
      });

      this.props.onClose();
    } catch (error) {
      console.log(error);
      this.setState({
        label: "Try Again",
        disabled: false
      });
    }
  };

  onClosed = () => {
    let action = this.state.pendingAction;

    this.setState({
      label: "Delete",
      disabled: false,
      pendingAction: null
    })

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

        <ActionSheet.Title
          value={`Are you sure you want to delete "${this.props.selectedSearch.name}"?`}
        />

        <ActionSheet.HR />

        <ActionSheet.Option
          value={this.state.label}
          disabled={this.state.disabled}
          textStyle={css.deleteOptionTextStyle}
          onPress={this.delete}
        />

        <ActionSheet.Button value={"Cancel"} onPress={this.props.onClose} />

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
