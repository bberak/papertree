import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ToolBar from './toolBar'

class Home extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={css.mainView}>
        <ToolBar />
      </View>
    )
  }
}

const css = EStyleSheet.create({
  mainView: {
    backgroundColor: "$homeBackgroundColor",
    flexDirection: "column",
    flex: 1
  }
})

export default Home