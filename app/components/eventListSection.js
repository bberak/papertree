import React, { Component, } from 'react'
import { View, Text, Platform} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

class EventListSection extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let line = Platform.OS === "ios" ? "——" : "—";
    return (
        <Text style={css.text}>{line} {this.props.value} {line}</Text>
    )
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.1%",
  $marginTop: "2.7%",
  $paddingBottom: "1.5%",
  text: {
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    backgroundColor: "$homeBackgroundColor",
    marginTop: "$marginTop",
    paddingBottom: "$paddingBottom",
    color: "$eventListSectionHeaderColor",
    textAlign: "center"
  }
})

export default EventListSection