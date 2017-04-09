import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import Login from './app/components/login'
import Home from './app/components/home'
import Loading from './app/components/loading'
import { Scene, Router } from 'react-native-router-flux';

export default class papertree extends Component {
  render() {
    return <Router>
            <Scene key="root">
              <Scene key="loading" component={Loading} hideNavBar={true}/>
              <Scene key="login" component={Login} hideNavBar={true} direction={"vertical"} />
              <Scene key="home" component={Home} hideNavBar={true} direction={"vertical"} />
            </Scene>
          </Router>
  }
}

AppRegistry.registerComponent('papertree', () => papertree);
