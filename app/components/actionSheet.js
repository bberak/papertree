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
          supportedOrientations={['portrait']}
          useNativeDriver={true}
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
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.85}>
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
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        activeOpacity={0.5}
        style={css.optionButton}
      >

        <Text style={[css.optionButtonText, this.props.textStyle, { opacity: this.props.disabled ? 0.5 : 1 }]}>
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
          disabled={this.props.letftOptionDisabled}
          onPress={this.props.onLeftOptionPress}
          activeOpacity={0.5}
          style={[css.optionButton, this.props.leftOptionTextStyle, { flex: 1, borderRightWidth: 0.5 }]}
        >

          <Text style={[css.optionButtonText, { opacity: this.props.letftOptionDisabled ? 0.5 : 1 }]}>
            {this.props.leftOptionValue}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.props.rightOptionDisabled}
          onPress={this.props.onRightOptionPress}
          activeOpacity={0.5}
          style={[css.optionButton, { flex: 1 }]}
        >

          <Text style={[css.optionButtonText, this.props.rightOptionTextStyle, { opacity: this.props.rightOptionDisabled ? 0.5 : 1 }]}>
            {this.props.rightOptionValue}
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

class HR extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={css.hr}>

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
    fontWeight: "600",
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
    color: "$actionSheetTitleFontColor",
    textAlign: "center"
  },
  optionButton: {
    height: "$optionButtonHeight",
    borderColor: "$actionSheetBorderColor",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  optionButtonText: {
    backgroundColor: "transparent",
    color: "$actionSheetOptionFontColor",
    fontSize: "$optionButtonFontHeight",
    letterSpacing: 0,
    textAlignVertical: "center"
  },
  textBox: {
    height: "$textBoxHeight",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexGrow: 1
  },
  textBoxText: {
    backgroundColor: "transparent",
    height: "$textBoxHeight",
    color: "$actionSheetTextBoxFontColor",
    fontSize: "$textBoxFontHeight",
    lineHeight: "$textBoxFontHeight",
    textAlign: "center",
    letterSpacing: 0,
    flex: 1
  },
  hr: {
    height: 0.5,
    backgroundColor: "$actionSheetBorderColor"
  }
});

export { Form, Button, Title, Option, TextBox, Options, HR };
