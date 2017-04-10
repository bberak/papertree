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
    this.refs.text.transitionTo({textShadowRadius: 0, scale: 0.95})
  }
  
  onPressOut = (e) => {
    this.refs.text.transitionTo({textShadowRadius: 2, scale: 1})
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
    alignSelf: "center"
  },
  text: {
    fontSize: "1.1rem",
    backgroundColor: "transparent",
    padding: 4,
    color: "$buttonFontColor",
    fontWeight: "600",
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: "$shadowColor",
    textShadowRadius: 2,
    letterSpacing: "$buttonLetterSpacing",
    alignSelf: "center"
  }
})

export default Link