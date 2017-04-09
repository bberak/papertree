import React, { Component, } from 'react'
import { View, TextInput} from 'react-native'
import api  from '../utils/papertrailApi'
import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'
import TextBox from './textBox'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <Animatable.View animation={"fadeIn"} ref={"form"}>
        <TextBox 
          placeholder={"Email"} 
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})} />
        <TextBox 
          placeholder={"Password"} 
          secureTextEntry={true} 
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})} />
      </Animatable.View>
    )
  }
}

const css = EStyleSheet.create({
  
})

export default LoginForm