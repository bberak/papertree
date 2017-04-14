import React, { Component, } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'

class Link extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onPressIn = () => {
    this.refs.text.transitionTo({textShadowRadius: 0, scale: 0.95, color: EStyleSheet.value("$secondaryColor")})
  }
  
  onPressOut = (e) => {
    this.refs.text.transitionTo({textShadowRadius: 2, scale: 1, color: EStyleSheet.value("$buttonFontColor")})
  }
  
  render() {
    return (
        <TouchableOpacity 
          style={css.container}
          activeOpacity={1} 
          onPressIn={this.onPressIn} 
          onPressOut={this.onPressOut} 
          onPress={this.props.onPress}>
          <Animatable.Text style={css.text} ref={"text"}>{this.props.value}</Animatable.Text>
        </TouchableOpacity>
    )
  }
}

const css = EStyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  $fontHeight: "3.85%",
  text: {
    fontSize: "$fontHeight",
    padding: 4,
    color: "$buttonFontColor",
    fontWeight: "600",
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: "$shadowColor",
    textShadowRadius: 2,
    letterSpacing: 1.02,
    alignSelf: "center"
  }
})

export default Link