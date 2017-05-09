import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";

class SaveSearchActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      label: "Save",
      disabled: false
    };
  }

  save = async () => {
    let searchName = _.trim(this.state.searchName);

    if (searchName) {
      this.setState({
        label: "Saving..",
        disabled: true
      });
      try {
        let newSearch = await api.saveSearch(
          searchName,
          this.props.searchTerm,
          this.props.filter
        );

        this.setState({
          pendingAction: () => {
            Actions.refresh({
              key: "home",
              selectedSearch: newSearch,
              searchTerm: newSearch.query,
              filter: { groupId: newSearch.group.id, groupName: newSearch.group.name },
              saveSearches: (this.props.savedSearches || []).push(newSearch)
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
    } else {
      this.refs.textBoxContainer.shake(400);
    }
  };

  onClosed = () => {
    let action = this.state.pendingAction;

    this.setState({
      searchName: "",
      label: "Save",
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

        <ActionSheet.Title value={"Save the current search?"} />

        <ActionSheet.HR />

        <Animatable.View ref="textBoxContainer">
          <ActionSheet.TextBox
            placeholder={"Name"}
            autoCorrect={false}
            returnKeyType={"done"}
            autoCapitalize={"none"}
            keyboardType={"default"}
            autoFocus={true}
            value={this.state.searchName}
            onChangeText={text => this.setState({ searchName: text })}
          />
        </Animatable.View>

        <ActionSheet.HR />

        <ActionSheet.Options
          leftOptionValue={"Cancel"}
          onLeftOptionPress={this.props.onClose}
          rightOptionValue={this.state.label}
          onRightOptionPress={() => {
            this.save();
          }}
          rightOptionDisabled={this.state.disabled}
        />

      </ActionSheet.Form>
    );
  }
}

const css = EStyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "20%"
  }
});

export default SaveSearchActionSheet;
