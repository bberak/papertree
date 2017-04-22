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
  $fontHeight: 14,
  text: {
    marginTop: "2.5%",
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    backgroundColor: "$homeBackgroundColor",
    paddingTop: 4,
    paddingBottom: 10,
    color: "$eventListSectionHeaderColor",
    textAlign: "center"
  }
})

export default EventListSection