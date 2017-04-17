import React, { Component, } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ToolBar from './toolBar'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: "",
      filter: {},
      logs: [],
      savedSearches: []
    }
  }

  onSearch = (term) => {
    this.setState({
      searchTerm: term
    })

    alert(term)
  }

  render() {
    return (
      <View style={css.mainView}>
        <StatusBar hidden={false} barStyle="light-content" />
        <ToolBar searchTerm={this.state.searchTerm} onSearch={this.onSearch} />
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