import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as ActionSheet from "./actionSheet";
import * as Animatable from "react-native-animatable";

class SaveSearchActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ActionSheet.Form
        visible={this.props.visible}
        onBackdropPress={this.props.onBackdropPress}
        formContainerStyle={css.formContainer}
      >

        <ActionSheet.Title value={"Save the current search?"} />

        <ActionSheet.HR />

        <Animatable.View ref="textBoxContainer" animation={this.props.saveFailed ? "shake" : null} duration={400} useNativeDriver={true}>
          <ActionSheet.TextBox
            placeholder={"Name"}
            autoCorrect={false}
            returnKeyType={"done"}
            autoCapitalize={"none"}
            keyboardType={"default"}
            autoFocus={false}
            value={this.props.name}
            onChangeText={this.props.onChangeName}
          />
        </Animatable.View>

        <ActionSheet.HR />

        <ActionSheet.Options
          leftOptionValue={"Cancel"}
          onLeftOptionPress={this.props.onCancel}
          rightOptionValue={this.props.saveFailed ? "Try Again" : this.props.saving ? "Saving.." : "Save"}
          onRightOptionPress={this.props.onSave}
          rightOptionDisabled={this.props.saving}
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
