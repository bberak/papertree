import React, { Component } from "react";
import { View, Image, StyleSheet, PixelRatio, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";

const pixelRatio = PixelRatio.get();

const images = [],
  index = 0,
  imgWidth = 300 / Math.min(2, pixelRatio),
  imgHeight = 300 / Math.min(2, pixelRatio),
  winHeight = EStyleSheet.value("100%", "height") * 2, //-- I've modded the EStyleSheet package to always scale height percentages against the longest side..
  winWidth = winHeight / 2 + StatusBar.currentHeight,
  imageSource = require("../images/noise.png");

for (var row = 0; row < Math.ceil(winHeight / imgHeight); row++) {
  let top = row * imgHeight;
  for (var col = 0; col < Math.ceil(winWidth / imgWidth); col++) {
    let left = col * imgWidth;
    images.push(
      <Image
        key={index}
        source={imageSource}
        style={{ position: "absolute", top: top, left: left, width: imgWidth, height: imgHeight }}
      />
    );
    index++;
  }
}

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const MyView = this.props.animate ? Animatable.View : View;

    return (
      <View style={[css.container, this.props.containerStyle]}>

        <MyView
          useNativeDriver={true}
          animation={"slideInDown"}
          duration={16000}
          iterationCount={"infinite"}
          easing={"linear"}
          style={css.imageContainer}
        >
          {images}
        </MyView>

        <View style={css.contentContainer}>
          {this.props.children}
        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    backgroundColor: "$primaryColor",
    width: winWidth,
    height: winHeight,
    position: "absolute"
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Background;
