import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import * as Animatable from "react-native-animatable";

class EventListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncate: true
    };
  }

  toggleTruncate = () => {
    this.setState({ truncate: !this.state.truncate})
  }

  render() {
    let details = this.props.isFirst
      ? <View>
          <Text style={css.hostname}>{this.props.hostname}</Text>
          <Text style={css.program}>{this.props.program}</Text>
        </View>
      : null;

    let indicator = this.props.message &&
      this.props.message.length > 300 &&
      this.state.truncate
      ? <Text style={css.indicator}> ...</Text>
      : null;

    let message = this.state.truncate
      ? _.truncate(this.props.message, { length: 300, omission: "" })
      : this.props.message;

    return (
      <View>
        {details}
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.toggleTruncate}
        >
          <Text style={css.message}>
            {message}
            {indicator}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: Math.round(EStyleSheet.value("27%", "height") / 10), //-- 2.7%
  $paddingBottom: Math.round(EStyleSheet.value("6%", "height") / 10), //-- 0.6%
  $fontHeightMessage: Math.round(EStyleSheet.value("24%", "height") / 10), //-- 2.1%,
  $lineHeightMessage: Math.round(EStyleSheet.value("32%", "height") / 10), //-- 3%,
  $paddingBottomMessage: Math.round(EStyleSheet.value("17%", "height") / 10), //-- 1.7%
  hostname: {
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: "$paddingBottom",
    color: "$eventListRowHostnameColor"
  },
  program: {
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: "$paddingBottom",
    color: "$eventListRowProgramColor"
  },
  message: {
    fontSize: "$fontHeightMessage",
    lineHeight: "$lineHeightMessage",
    paddingBottom: "$paddingBottomMessage",
    color: "$eventListRowMessageColor"
  },
  indicator: {
    fontWeight: "bold",
    color: "$eventListRowHostnameColor"
  }
});

export default EventListRow;
