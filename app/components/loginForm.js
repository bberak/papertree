import React, { Component, } from 'react'
import { View, Text } from 'react-native'
import api  from '../utils/papertrailApi'
import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as Animatable from 'react-native-animatable'
import TextBox from './textBox'
import Button from './button'
import Label from './label'
import Link from './link'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  
  onTryLogin = () => {
    if (this.state.email && this.state.password) {
      
    }
    
    this.refs.textBoxes.shake(400)
  }

  render() {
    return (
      <Animatable.View animation={"fadeIn"} ref={"form"} style={css.form}>
        
        <Animatable.View ref={"textBoxes"} style={css.textBoxes}>
          
          <TextBox 
              ref={"email"}
              placeholder={"Email"} 
              value={this.state.email}
              autoCorrect={false}
              returnKeyType={"next"}
              autoCapitalize={"none"}
              onSubmitEditing={() => this.refs.password.focus()}
              onChangeText={(text) => this.setState({email: text})} />
        
            <TextBox 
              ref={"password"}
              placeholder={"Password"} 
              secureTextEntry={true} 
              value={this.state.password}
              autoCorrect={false}
              returnKeyType={"done"}
              autoCapitalize={"none"}
              onSubmitEditing={this.onTryLogin}
              onChangeText={(text) => this.setState({password: text})} />
          
        </Animatable.View>  
        
        <Button value={"Login"} onPress={this.onTryLogin} />
        <Label value={"— or —"} />
        <Link value={"Create Account"} onPress={() => console.log("Pressed")} />

      </Animatable.View>
    )
  }
}

const css = EStyleSheet.create({
  form: {
    flex: 1,
    paddingBottom: 30
  },
  textBoxes: {
    flex: 1
  }
})

export default LoginForm