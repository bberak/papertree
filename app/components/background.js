import React, { Component, } from 'react'
import { View, Text, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from "react-native-animatable";

class Background extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    const MyImage = this.props.animate ? Animatable.Image : Image;

    return (
      <View style={[css.container, this.props.containerStyle]}>
        <MyImage 
          useNativeDriver={true}
          animation={"slideInDown"}
          duration={16000}
          iterationCount={"infinite"}
          easing={"linear"}
          style={css.backgroundImage} 
          resizeMode={this.props.resizeMode || "repeat"}
          source={this.props.imageSource || require('../images/noise.png')}
          blurRadius={this.props.blurRadius}>
        </MyImage>
        <View style={css.contentContainer}>
            {this.props.children}
        </View>
      </View>
    )
  }
}

const css = EStyleSheet.create({
  $height: "100%",
  container: {
    flex: 1
  },
  backgroundImage: {
    backgroundColor: "$primaryColor",
    width: "$height", //-- I've modded the EStyleSheet package to always scale height percentages against the longest side..
    height: "2 * $height",
    position: "absolute"
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default Background