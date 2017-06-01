import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import SaveSearchActionSheet from "./saveSearchActionSheet";
import DeleteSearchActionSheet from "./deleteSearchActionSheet";
import { connect } from "react-redux";

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");
const restPosition = -40;
const hiddenPosition = 0;

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bookmarkVisible)
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

  render() {
    const actionSheet = this.props.selectedSearch ? 
      <DeleteSearchActionSheet
          visible={false}
          onClose={() => this.setState({ opened: false })}
          onClosed={this.showBookmark}
          savedSearches={this.props.savedSearches} 
          selectedSearch={this.props.selectedSearch}
        /> :
        <SaveSearchActionSheet
          visible={this.props.saveSearchActionSheetVisible}
          saving={this.props.savingSearch}
          saveFailed={this.props.saveSearchFailed}
          name={this.props.searchName}  
          onCancel={() => this.props.dispatch({ type: "CLOSE_SAVE_SEARCH_ACTIONSHEET"})}
          onBackdropPress={() => this.props.dispatch({ type: "CLOSE_SAVE_SEARCH_ACTIONSHEET"})}
          onChangeName={text => this.props.dispatch({ type: "SAVE_SEARCH_NAME_CHANGED", searchName: text})}
          onSave={() => this.props.dispatch({ type: "SAVE_SEARCH", searchName: this.props.searchName, searchTerm: this.props.lastSearch, filter: this.props.filter })}
        />;

    return (
      <View style={css.container} onLayout={() => this.props.dispatch({ type: "ON_LAYOUT"})}>

        {actionSheet}

        <TouchableOpacity
          style={css.imageContainer}
          activeOpacity={1}
          onPressIn={this.hideBookmark}
          onPressOut={this.showBookmark}
          onPress={() => this.props.dispatch({ type: "OPEN_ACTIONSHEET"})}
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
