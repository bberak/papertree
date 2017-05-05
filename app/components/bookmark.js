import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import SaveSearchModal from "./saveSearchModal";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");
const restPosition = -40;
const pressedPosition = -55;
const hiddenPosition = 0;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  onPressIn = () => {
    this.refs.image.transitionTo({
      marginTop: pressedPosition
    });
  };

  onPressOut = () => {
    this.refs.image.transitionTo({
      marginTop: restPosition
    });
  };

  onPress = () => {
    this.refs.image.transitionTo({
      marginTop: hiddenPosition
    });

    this.setState({
      modalVisible: true
    });
  };

  render() {
    return (
      <View style={[css.container, this.props.containerStyle]}>

        <SaveSearchModal
          visible={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          onClosed={this.onPressOut}
        />

        <TouchableOpacity
          style={css.imageContainer}
          activeOpacity={1}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onPress={this.onPress}
        >
          <Animatable.Image
            ref={"image"}
            style={css.image}
            source={imageSource}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 0
  },
  image: {
    backgroundColor: "transparent",
    marginRight: "3%",
    height: 66,
    marginTop: restPosition
  }
});

export default Bookmark;
