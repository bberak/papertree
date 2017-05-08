import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import SaveSearchActionSheet from "./saveSearchActionSheet";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");
const restPosition = -40;
const pressedPosition = -55;
const hiddenPosition = 0;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetVisible: false
    };
  }

  showBookmark = () => {
    this.refs.image.transitionTo({
      marginTop: restPosition
    });
  }

  hideBookmark = () => {
    this.refs.image.transitionTo({
      marginTop: hiddenPosition
    });
  }

  onPress = () => {
    this.hideBookmark();

    this.setState({
      sheetVisible: true
    });
  };

  getOrientation = () => {
    let dims = Dimensions.get("window");
    return dims.height > dims.width ? "portrait" : "landscape";
  }

  onLayout = () => {
    if (this.getOrientation() === "portrait") {
      this.showBookmark();
    } else {
      this.hideBookmark();
    }
  }

  render() {
    return (
      <View style={[css.container, this.props.containerStyle]} onLayout={this.onLayout}>

        <SaveSearchActionSheet
          visible={this.state.sheetVisible && this.getOrientation() === "portrait"}
          onClose={() => this.setState({ sheetVisible: false })}
          onClosed={this.showBookmark}
        />

        <TouchableOpacity
          style={css.imageContainer}
          activeOpacity={1}
          onPressIn={this.hideBookmark}
          onPressOut={this.showBookmark}
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
