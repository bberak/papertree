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
import * as Str from "../utils/str";
import { connect } from "react-redux";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");
const restPosition = -40;
const hiddenPosition = 0;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.canShowBookmark(nextProps.searchTerm) && nextProps.saveSearchActionSheetVisible === false)
      this.showBookmark();
    else
      this.hideBookmark();
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

    this.props.dispatch({ type: "OPEN_SAVE_SEARCH_ACTIONSHEET"});
  };

  getOrientation = () => {
    let dims = Dimensions.get("window");
    return dims.height > dims.width ? "portrait" : "landscape";
  }

  onLayout = () => {
    if (this.canShowBookmark(this.props.searchTerm) && this.props.saveSearchActionSheetVisible === false) {
      this.showBookmark();
    } else {
      this.hideBookmark();
    }
  }

  canShowBookmark = (searchTerm) => {
    return this.getOrientation() === "portrait" && Str.isNotNullOrWhiteSpace(searchTerm);
  }

  render() {
    const visible = this.props.saveSearchActionSheetVisible === true && this.canShowBookmark(this.props.searchTerm);

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
          onClosed={this.showBookmark}
          savedSearches={this.props.savedSearches} 
          searchTerm={this.props.searchTerm}
          filter={this.props.filter}
        />;

    return (
      <View style={css.container} onLayout={this.onLayout}>

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
    height: 0
  },
  image: {
    backgroundColor: "transparent",
    marginRight: "3%",
    height: 66,
    marginTop: restPosition
  }
});

export default connect(s => s)(Bookmark);
