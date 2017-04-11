import React, { Component, } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'

class Button extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onPressIn = () => {
    this.refs.buttonContainer.transitionTo({elevation: 1, shadowRadius: 1, shadowOpacity: 0.9, transform: [{scale: 0.95}]})
    this.refs.text.transitionTo({textShadowRadius: 0})
  }
  
  onPressOut = (e) => {
    this.refs.buttonContainer.transitionTo({elevation: 4, shadowRadius: 4, shadowOpacity: 0.5, transform: [{scale: 1}]})
    this.refs.text.transitionTo({textShadowRadius: 2})
  }
  
  render() {
    return (
      <View style={css.container}>
        <Animatable.View style={css.buttonContainer} ref={"buttonContainer"}>

          <TouchableOpacity 
            style={css.textContainer} 
            activeOpacity={1} 
            onPressIn={this.onPressIn} 
            onPressOut={this.onPressOut} 
            onPress={this.props.onPress}>
            <Animatable.Text style={css.text} ref={"text"}>{this.props.value}</Animatable.Text>
          </TouchableOpacity>

        </Animatable.View>
      </View>
    )
  }
}

const css = EStyleSheet.create({
  container: {
    alignItems: "center"
  },
  $inputHeight: 44,
  $inputWidth: "80%",
  buttonContainer: {
    width: "$inputWidth",
    height: "$inputHeight",
    backgroundColor: "$buttonColor",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: "$shadowColor",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4
  },
  textContainer: {
    backgroundColor: "transparent", 
    flex: 1, 
    height: "$inputHeight", 
    alignItems: "center", 
    justifyContent: "center"
  },
  text: {
    fontSize: "1.1rem",
    paddingBottom: 4,
    paddingTop: 4,
    color: "$buttonFontColor",
    fontWeight: "600",
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: "$shadowColor",
    textShadowRadius: 2,
    letterSpacing: "$buttonLetterSpacing"
  }
})

export default Button