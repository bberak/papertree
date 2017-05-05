import React, { Component, PropTypes } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let children = this.props.children || [];
    children = children instanceof Array ? children : [children];
    let buttons = children.filter(x => x.type === Button);
    let options = children.filter(x => x.type !== Button);
    let form = null;

    if (options.length > 0) {
      form = (
        <View style={[css.container, this.props.formContainerStyle]}>
          <View style={css.form}>
            <TouchableWithoutFeedback>
              <View>
                {options}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.onBackdropPress}>
        <Modal
          onModalHide={this.props.onClosed}
          backdropOpacity={this.props.backdropOpacity || 0.4}
          isVisible={this.props.visible}
        >

          {form}

          {buttons}

        </Modal>

      </TouchableWithoutFeedback>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.95}>
        <View style={css.button}>

          <Text style={css.buttonText}>
            {this.props.value}
          </Text>

        </View>
      </TouchableOpacity>
    );
  }
}

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={css.title}>
        <Text style={css.titleText}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.5}
        style={css.optionButton}
      >

        <Text style={css.optionButtonText}>
          {this.props.value}
        </Text>

      </TouchableOpacity>
    );
  }
}

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>

        <TouchableOpacity
          onPress={this.props.onLeftPress}
          activeOpacity={0.5}
          style={[css.optionButton, { flex: 1, borderRightWidth: 0.5 }]}
        >

          <Text style={css.optionButtonText}>
            {this.props.leftValue}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.onRightPress}
          activeOpacity={0.5}
          style={[css.optionButton, { flex: 1 }]}
        >

          <Text style={css.optionButtonText}>
            {this.props.rightValue}
          </Text>

        </TouchableOpacity>

      </View>
    );
  }
}

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={css.textBox}>

        <TextInput style={css.textBoxText} {...this.props} />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $buttonHeight: "8.54%",
  $buttonFontHeight: "3.3%",
  $buttonMarginTop: "1.4%",
  $optionButtonHeight: "8.54%",
  $optionButtonFontHeight: "3.4%",
  $titlePaddingTop: "2.85%",
  $titlePaddingBottom: "2.85%",
  $titleFontHeight: "2.8%",
  $titleFontLineHeight: "3.5%",
  $textBoxHeight: "8.54%",
  $textBoxFontHeight: "3.4%",
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  form: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  button: {
    height: "$buttonHeight",
    borderRadius: 12,
    backgroundColor: "white",
    marginTop: "$buttonMarginTop",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    backgroundColor: "transparent",
    color: "$actionSheetButtonFontColor",
    fontSize: "$buttonFontHeight",
    lineHeight: "$buttonFontHeight",
    fontWeight: "600",
    letterSpacing: 0
  },
  optionButton: {
    borderTopWidth: 0.5,
    borderColor: "$actionSheetOptionBorderColor",
    height: "$optionButtonHeight",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  optionButtonText: {
    backgroundColor: "transparent",
    color: "$actionSheetOptionFontColor",
    fontSize: "$optionButtonFontHeight",
    lineHeight: "$optionButtonFontHeight",
    letterSpacing: 0
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    padding: "$titlePaddingTop"
  },
  titleText: {
    backgroundColor: "transparent",
    fontSize: "$titleFontHeight",
    lineHeight: "$titleFontLineHeight",
    fontWeight: "500",
    letterSpacing: 0,
    color: "$actionSheetTitleFontColor"
  },
  textBox: {
    borderTopWidth: 0.5,
    borderColor: "$actionSheetTextBoxBorderColor",
    height: "$textBoxHeight",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  textBoxText: {
    backgroundColor: "transparent",
    height: "$textBoxHeight",
    color: "$actionSheetTextBoxFontColor",
    fontSize: "$textBoxFontHeight",
    lineHeight: "$textBoxFontHeight",
    textAlign: "center",
    letterSpacing: 0
  }
});

export { Form, Button, Title, Option, TextBox, Options };
