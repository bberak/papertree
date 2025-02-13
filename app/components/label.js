import React, { Component, } from 'react'
import { View, Text} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

class Label extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
        <Text style={[css.text, this.props.textStyle]}>— {this.props.value} —</Text>
    )
  }
}

const css = EStyleSheet.create({
  $fontHeight: "3.1%",
  text: {
    fontSize: "$fontHeight",
    backgroundColor: "transparent",
    paddingBottom: 4,
    paddingTop: 4,
    color: "$labelFontColor",
    fontWeight: "600",
    textShadowOffset: {width: 0, height: 1},
    textShadowColor: "$shadowColor",
    textShadowRadius: 2,
    letterSpacing: 1.02,
    opacity: 0.67,
    textAlign: "center"
  }
})

export default Label