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
import Browser from  '../utils/browser'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      connecting: false
    }
  }
  
  onTryLogin = async () => {
    if (this.state.email && this.state.password) {
      try {
        this.setState({ connecting: true });
        await api.login(this.state.email, this.state.password)
        Actions.home();
      } catch (error) {
        this.setState({ connecting: false });
        this.refs.textBoxes.shake(400)
      }
    } else 
      this.refs.textBoxes.shake(400)
  }

  onCreateAccount = () => {
    Browser.openURL("https://papertrailapp.com/signup?plan=free");
  }

  render() {
    return (
      <Animatable.View animation={"fadeIn"} ref={"form"} style={css.form}>
        
        <Animatable.View ref={"textBoxes"}>
          
          <TextBox 
              ref={"email"}
              placeholder={"Email"} 
              value={this.state.email}
              autoCorrect={false}
              returnKeyType={"next"}
              autoCapitalize={"none"}
              containerStyle={css.textBoxContainerStyle}
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
            containerStyle={css.textBoxContainerStyle}
            onSubmitEditing={this.onTryLogin}
            onChangeText={(text) => this.setState({password: text})} />

        </Animatable.View> 
        
        <Button value={this.state.connecting ? "Connecting.." : "Login"} onPress={this.onTryLogin} disabled={this.state.connecting} />
        <Label value={"— or —"} />
        <Link value={"Create Account"} onPress={this.onCreateAccount} />
  
      </Animatable.View>
    )
  }
}

const css = EStyleSheet.create({
  form: {
    flex: 1
  },
  textBoxContainerStyle: {
    paddingHorizontal: "10%"
  }
})

export default LoginForm