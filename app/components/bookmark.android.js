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

const imageSource = require("../images/bookmark.png");
const activeImageSource = require("../images/bookmark-active.png");

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  onPressIn = () => {
    this.setState({
      pressed: true
    });

    this.refs.image.transitionTo({
      top: 11
    });
  };

  onPressOut = () => {
    this.setState({
      pressed: false
    });

    this.refs.image.transitionTo({
      top: 26
    });
  };

  onPress = () => {
    this.refs.image.transitionTo({
      top: 66
    });

    this.setState({
      pressed: false,
      isModalVisible: true
    });

    if (this.props.onPress) this.props.onPress();
  };

  getImageSource = () => {
    let images = this.props.active
      ? [activeImageSource, imageSource]
      : [imageSource, activeImageSource];

    return !this.state.pressed ? images[0] : images[1];
  };

  render() {
    return (
      <View
        style={[css.container, this.props.containerStyle]}
        pointerEvents={"box-none"}
      >

        <TouchableWithoutFeedback
          onPress={() => this.setState({ isModalVisible: false })}
          activeOpacity={0}
        >
          <Modal
            onModalHide={() => {
              this.refs.image.transitionTo({ top: 26 });
            }}
            backdropOpacity={0.2}
            isVisible={this.state.isModalVisible}
          >

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 0 }
                }}
              >
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={{ backgroundColor: "transparent" }}>
                      Hello!
                    </Text>
                    <Text style={{ backgroundColor: "transparent" }}>
                      Hello!
                    </Text>
                    <Text style={{ backgroundColor: "transparent" }}>
                      Hello!
                    </Text>
                    <TouchableOpacity
                      onPress={() => alert("Clicked")}
                      activeOpacity={0.5}
                    >
                      <Text style={{ backgroundColor: "transparent" }}>
                        Click me!
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ backgroundColor: "transparent" }}>
                      Hello!
                    </Text>
                    <Text style={{ backgroundColor: "transparent" }}>
                      Hello!
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: false })}
              activeOpacity={0.95}
            >
              <View
                style={{
                  height: 57,
                  borderRadius: 12,
                  backgroundColor: "white",
                  marginTop: 8,
                  shadowColor: "#000",
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 0 }
                }}
              >

                <Text
                  style={{
                    backgroundColor: "transparent",
                    color: "#007AFF",
                    fontSize: 20,
                    lineHeight: 20,
                    fontWeight: "500"
                  }}
                >
                  Cancel
                </Text>

              </View>

            </TouchableOpacity>

          </Modal>

        </TouchableWithoutFeedback>

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
            source={this.getImageSource()}
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
