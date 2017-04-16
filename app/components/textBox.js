import React, { Component, } from 'react'
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'

class TextBox extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  focus = () => {
    this.refs.input.focus();
  }
  
  onFocus = () => {
    this.refs.textContainer.transitionTo({elevation: 8, shadowRadius: 8, shadowOpacity: 0.9, transform: [{scale: 1.03}]})
  }
  
  onBlur = () => {
    this.refs.textContainer.transitionTo({elevation: 4, shadowRadius: 4, shadowOpacity: 0.5, transform: [{scale: 1}]})
  }

  render() {
    let clearButton = this.props.value ?
        <TouchableOpacity 
          style={css.padding} 
          activeOpacity={0.5} 
          onPress={() => { 
            this.props.onChangeText("");
            this.focus(); 
          }}>
          <Image source={require("../images/clear.png")} />
        </TouchableOpacity> :
        <View style={css.padding}></View>;
    
    return (
      <View style={[css.container, this.props.containerStyle]}>
        <Animatable.View style={css.textContainer} ref={"textContainer"}>

          <View style={css.padding}>
          </View>

          <TextInput
            ref={"input"}
            {...this.props}
            style={css.text} 
            onFocus={this.onFocus} 
            onBlur={this.onBlur}
            underlineColorAndroid={"transparent"} />

          {clearButton}

        </Animatable.View>
      </View>
    )
  }
}

const css = EStyleSheet.create({
  container: {
  },
  $fontHeight: "3.85%",
  $inputHeight: "7.76%",
  textContainer: {
    flexGrow: 1,
    height: "$inputHeight",
    backgroundColor: "$textInputColor",
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
  text: {
    height: "$inputHeight",
    backgroundColor: "transparent",
    textAlign: "center",
    textAlignVertical: "center",
    flex: 0.7,
    fontSize: "$fontHeight",
    paddingTop: 0,
    paddingBottom: 0
  },
  padding: {
    backgroundColor: "transparent", 
    flex: 0.15, 
    height: "$inputHeight", 
    alignItems: "center", 
    justifyContent: "center"
  }
})

export default TextBox