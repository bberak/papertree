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
  $fontHeight: 18,
  $fontHeightMessage: 14,
  $fontHeightMessageIndicator: 18,
  hostname: {
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 4,
    color: "$eventListRowHostnameColor"
  },
  program: {
    fontSize: "$fontHeight",
    lineHeight: "$fontHeight",
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 4,
    color: "$eventListRowProgramColor"
  },
  message: {
    fontSize: "$fontHeightMessage",
    lineHeight: "$fontHeight",
    paddingBottom: 6,
    color: "$eventListRowMessageColor"
  },
  indicator: {
    fontSize: "$fontHeightMessageIndicator",
    lineHeight: "$fontHeightMessageIndicator",
    fontWeight: "bold",
    color: "$eventListRowHostnameColor"
  }
});

export default EventListRow;
