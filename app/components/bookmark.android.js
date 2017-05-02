import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");

class Bookmark extends Component {
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

    this.refs.image.transitionTo({
      top: 11,
      transform: [{ scale: 1 }]
    });
  };

  onPressOut = () => {
    this.setState({
      pressed: false
    });

    this.refs.image.transitionTo({
      top: 26,
      transform: [{ scale: 1 }]
    });
  };

  onPress = () => {
    this.setState({
      pressed: false
    });

    if (this.props.onPress) this.props.onPress();
  };

  getImageSource = () => {
    let images = this.props.active
      ? [activeImageSource, imageSource]
      : [imageSource, activeImageSource];

    return !this.state.pressed ? images[0] : images[1];
  };

  render() {
    return (
      <View style={[css.container, this.props.containerStyle]} pointerEvents={"box-none"} >

        <TouchableOpacity
          style={css.imageContainer}
          activeOpacity={1}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onPress={this.onPress}
        >
          <Animatable.Image ref={"image"}  style={css.image} source={this.getImageSource()} />
        </TouchableOpacity>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 66,
    backgroundColor: "transparent",
    marginTop: -66,
    alignItems: "center"

  },
  image: {
    backgroundColor: "transparent",
    marginRight: "3%",
    height: 66,
    top: 26
  }
});

export default Bookmark;
