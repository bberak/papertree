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
import DeleteSearchActionSheet from "./deleteSearchActionSheet";
import _ from "lodash";
import * as Str from "../utils/str";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");
const restPosition = 26;
const hiddenPosition = 66;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.canShowBookmark(nextProps.searchTerm))
      this.showBookmark();
    else
      this.hideBookmark();
  }

  showBookmark = () => {
    this.refs.image.transitionTo({
      top: restPosition
    });
  }

  hideBookmark = () => {
    this.refs.image.transitionTo({
      top: hiddenPosition
    });
  }

  onPress = () => {
    this.hideBookmark();

    this.setState({
      opened: true
    });
  };

  getOrientation = () => {
    let dims = Dimensions.get("window");
    return dims.height > dims.width ? "portrait" : "landscape";
  }

  onLayout = () => {
    if (this.canShowBookmark(this.props.searchTerm) && this.state.opened === false) {
      this.showBookmark();
    } else {
      this.hideBookmark();
    }
  }

  canShowBookmark = (searchTerm) => {
    return this.getOrientation() === "portrait" && Str.isNotNullOrWhiteSpace(searchTerm);
  }

  render() {
    const visible = this.state.opened === true && this.canShowBookmark(this.props.searchTerm);

    const actionSheet = this.props.selectedSearch ? 
      <DeleteSearchActionSheet
          visible={visible}
          onClose={() => this.setState({ opened: false })}
          onClosed={this.showBookmark}
          savedSearches={this.props.savedSearches} 
          selectedSearch={this.props.selectedSearch}
        /> :
        <SaveSearchActionSheet
          visible={visible}
          onClose={() => this.setState({ opened: false })}
          onClosed={this.showBookmark}
          savedSearches={this.props.savedSearches} 
          searchTerm={this.props.searchTerm}
          filter={this.props.filter}
        />;

    return (
      <View
        style={css.container}
        pointerEvents={"box-none"}
        onLayout={_.debounce(this.onLayout, 150)}
      >

        {actionSheet}

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
            source={this.props.selectedSearch ? activeImageSource : imageSource}
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
    height: 66,
    backgroundColor: "transparent",
    marginTop: -66,
    alignItems: "center"
  },
  image: {
    backgroundColor: "transparent",
    marginRight: "3%",
    height: 66,
    top: 26
  }
});

export default Bookmark;
