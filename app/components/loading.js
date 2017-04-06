import React, { Component, } from 'react'
import { View, ActivityIndicator } from 'react-native'
import api  from '../utils/papertrailApi'
import { Actions } from 'react-native-router-flux'

class Loading extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount = async () => {
    if (await api.isAuthenticated())
      Actions.home();
    else
      Actions.login();
  }

  render() {
    return (
      <View style={{paddingTop: 150}}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default Loading