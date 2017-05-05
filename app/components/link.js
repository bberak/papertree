import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";

class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  onPressIn = () => {
    this.setState({
      pressed: true
    });

    this.refs.text.transitionTo({
      textShadowRadius: 0,
      scale: 0.95
    });
  };

  onPressOut = () => {
    this.setState({
      pressed: false
    });

    this.refs.text.transitionTo({
      textShadowRadius: 2,
      scale: 1
    });
  };

  onPress = () => {
    this.setState({
      pressed: false
    });

    if (this.props.disabled) return;
    else this.props.onPress();
  };

  getColor = () => {
    if (this.state.pressed) {
      if (this.props.disabled)
      return this.props.disabledColorPressed || EStyleSheet.value("$disabledLinkFontColorPressed");
    else 
      return this.props.colorPressed || EStyleSheet.value("$linkFontColorPressed");
    } else {
      if (this.props.disabled)
      return this.props.disabledColor || EStyleSheet.value("$disabledLinkFontColor");
    else 
      return this.props.color || EStyleSheet.value("$linkFontColor");
    }    
  };

  render() {
    return (
      <TouchableOpacity
        style={css.container}
        activeOpacity={1}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
      >
        <Animatable.Text
          style={[
            css.text,
            {
              color: this.getColor()
            }
          ]}
          ref={"text"}
        >
          {this.props.value}
        </Animatable.Text>
      </TouchableOpacity>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  $fontHeight: "3.3%",
  text: {
    fontSize: "$fontHeight",
    padding: 4,
    color: "$linkFontColor",
    fontWeight: "600",
    textShadowOffset: { width: 0, height: 1 },
    textShadowColor: "$shadowColor",
    textShadowRadius: 2,
    letterSpacing: 1.02,
    alignSelf: "center"
  }
});

export default Link;
