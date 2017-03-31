import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Main extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text>Main Screen :)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 50,
    backgroundColor: "#eee"
  }
})

export default Main