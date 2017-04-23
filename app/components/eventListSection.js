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
  $fontHeight: Math.round(EStyleSheet.value("21%", "height") / 10), //-- 2.1%
  $marginTop: Math.round(EStyleSheet.value("27%", "height") / 10), //-- 2.1%
  $paddingBottom: Math.round(EStyleSheet.value("15%", "height") / 10), //-- 1.5,
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