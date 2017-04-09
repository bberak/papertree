import React, { Component, } from 'react'
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'

class TextBox extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onFocus = () => {
    this.refs.container.transitionTo({shadowRadius: 8, shadowOpacity: 0.9, transform: [{scale: 1.03}]})
  }
  
  onBlur = () => {
    this.refs.container.transitionTo({shadowRadius: 4, shadowOpacity: 0.5, transform: [{scale: 1}]})
  }

  render() {
    let clearButton = this.props.value ?
        <TouchableOpacity style={css.padding} activeOpacity={0.5} onPress={() => this.props.onChangeText("")}>
          <Image source={require("../images/clear.png")} />
        </TouchableOpacity> :
        <View style={css.padding}></View>;
    
    return (
      <Animatable.View style={css.container} ref={"container"}>
        
        <View style={css.padding}>
        </View>
        
        <TextInput
          {...this.props}
          style={css.text} 
          onFocus={this.onFocus} 
          onBlur={this.onBlur} />
        
        {clearButton}
        
      </Animatable.View>
    )
  }
}

const css = EStyleSheet.create({
  $inputHeight: 44,
  $inputWidth: "80%",
  container: {
    width: "$inputWidth",
    height: "$inputHeight",
    backgroundColor: "$textInputBackgroundColor",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: "$shadowColor",
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  text: {
    height: "$inputHeight",
    backgroundColor: "transparent",
    textAlign: "center",
    flex: 0.8
  },
  padding: {
    backgroundColor: "transparent", 
    flex: 0.1, 
    height: "$inputHeight", 
    alignItems: "center", 
    justifyContent: "center"
  }
})

export default TextBox