import React, { Component, } from 'react'
import { View, ActivityIndicator, Image, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Background from './background'
import LoginForm from './loginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    let form = this.props.loading ? 
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
          contentContainerStyle={css.scrollContentContainer}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}>
          
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

export default connect(s => s)(Login)