/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Login from './js/login'
import Main from './js/main'

export default class papertree extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: "Login" }}
        configureScene={configureTransitions}
        renderScene={renderNavigation} />
    );
  }
}

const configureTransitions = (route, routeStack) => { 
  return route.transition || Navigator.SceneConfigs.HorizontalSwipeJump;
}

const renderNavigation = (route, navigator) => {  
  switch (route.name) {
    case "Login":
      return <Login navigator={navigator} {...route.passProps} />
    case "Main":
      return <Main navigator={navigator} {...route.passProps} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('papertree', () => papertree);
