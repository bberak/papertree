import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

class SaveSearchActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  save = async () => {
    this.props.dispatch({ type: "SAVE_SEARCH", searchName: this.props.searchName, searchTerm: this.props.searchTerm, filter: this.props.filter })
  };

  render() {
    return (
      <ActionSheet.Form
        visible={this.props.visible}
        onBackdropPress={() => this.props.dispatch({ type: "CLOSE_SAVE_SEARCH_ACTIONSHEET"})}
        onClosed={this.props.onClosed}
        formContainerStyle={css.formContainer}
      >

        <ActionSheet.Title value={"Save the current search?"} />

        <ActionSheet.HR />

        <Animatable.View ref="textBoxContainer" animation={this.props.saveSearchFailed ? "shake" : null} duration={400}>
          <ActionSheet.TextBox
            placeholder={"Name"}
            autoCorrect={false}
            returnKeyType={"done"}
            autoCapitalize={"none"}
            keyboardType={"default"}
            autoFocus={false}
            value={this.props.searchName}
            onChangeText={text => this.props.dispatch({ type: "SAVE_SEARCH_NAME_CHANGED", searchName: text})}
          />
        </Animatable.View>

        <ActionSheet.HR />

        <ActionSheet.Options
          leftOptionValue={"Cancel"}
          onLeftOptionPress={() => this.props.dispatch({ type: "CLOSE_SAVE_SEARCH_ACTIONSHEET"})}
          rightOptionValue={this.props.saveSearchFailed ? "Try Again" : this.props.savingSearch ? "Saving.." : "Save"}
          onRightOptionPress={() => {
            this.save();
          }}
          rightOptionDisabled={this.props.savingSearch}
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

export default connect(s => s)(SaveSearchActionSheet);
