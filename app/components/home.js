import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Home extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text>Home Screen :)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 70,
    backgroundColor: "#eee"
  }
})

export default Home