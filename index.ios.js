/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import Login from './js/login'
import Home from './js/home'
import { Scene, Router } from 'react-native-router-flux';

export default class papertree extends Component {
  render() {
    return <Router>
            <Scene key="root">
              <Scene key="login" component={Login} title="Login" hideNavBar={true}/>
              <Scene key="home" component={Home} title="Home" hideNavBar={true} direction="vertical" />
            </Scene>
          </Router>
  }
}

AppRegistry.registerComponent('papertree', () => papertree);
