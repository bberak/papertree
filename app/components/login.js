import React, { Component, } from 'react'
import { View, ActivityIndicator, Image, StatusBar, Text, KeyboardAvoidingView } from 'react-native'
import api  from '../utils/papertrailApi'
import { Actions } from 'react-native-router-flux'
import EStyleSheet from 'react-native-extended-stylesheet'
import Background from './background'
import LoginForm from './loginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  
  componentDidMount = async () => {
    if (await api.isLoggedIn())
      Actions.home();
    else
      this.setState({loading: false});
  }

  render() {
    
    let form = this.state.loading ? 
        <View style={css.activityIndicatorContainer}>
          <ActivityIndicator color={EStyleSheet.value("$indicatorColor")} />
        </View> :
        <LoginForm />
    
    return (
      <Background>
        
        <StatusBar hidden={false} barStyle="light-content" />
        
        <KeyboardAwareScrollView 
          ref={"scroll"}
          style={css.scrollContainer} 
          contentContainerStyle={css.scrollContentContainer}>
          
          <View style={css.logoContainer}>
            <Image source={require("../images/logo.png")} />
          </View>

          <View style={css.formContainer}>
            {form}  
          </View>
          
        </KeyboardAwareScrollView>
        
      </Background>
    )
  }
}

const css = EStyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flex: 0.5
  },
  activityIndicatorContainer: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center"
  }
})

export default Login