import React, { Component, } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

class Login extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{marginTop: 70}}>
        <Text>Logo goes here</Text>
        <TouchableOpacity onPress={Actions.home}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login