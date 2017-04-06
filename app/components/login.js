import React, { Component, } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import api from '../utils/papertrailApi'

class Login extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }
  
  onLogin = async () => {
    try {
      await api.authenticate(this.state.email, this.state.password);
      this.setState({
        email: "",
        password: ""
      })
      Actions.home();
    } catch (error) {
      console.log(error)
      alert("Incorrect credentials");
    }
  };

  render() {
    return (
      <View style={{marginTop: 70}}>
        <Text>Logo goes here</Text>
        
        <TextInput style={{height: 20}} value={this.state.email} placeholder={"Email"} onChangeText={(text) => this.setState({email: text})} autoCapitalize={"none"} autoCorrect={false} keyboardType={"email-address"} returnKeyType={"next"} />
        <TextInput style={{height: 20}} value={this.state.password} placeholder={"Password"} onChangeText={(text) => this.setState({password: text})} autoCapitalize={"none"} autoCorrect={false} returnKeyType={"go"} secureTextEntry={true} />
        <TouchableOpacity onPress={this.onLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login