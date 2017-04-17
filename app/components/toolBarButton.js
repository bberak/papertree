import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";

class ToolBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  onPressIn = () => {
    this.setState({
      active: !this.state.active
    });

    this.refs.buttonContainer.transitionTo({
      elevation: 1,
      shadowRadius: 1,
      shadowOpacity: 0.9,
      transform: [{ scale: 0.9 }]
    });
  };

  onPressOut = () => {
    this.refs.buttonContainer.transitionTo({
      elevation: 4,
      shadowRadius: 4,
      shadowOpacity: 0.5,
      transform: [{ scale: 1 }]
    });

    if (this.props.onPress) 
      this.props.onPress();
  };

  render() {
    return (
      <View style={[css.container, this.props.containerStyle]}>
        <Animatable.View style={css.buttonContainer} ref={"buttonContainer"}>

          <TouchableOpacity
            style={css.imageContainer}
            activeOpacity={1}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}
          >
            <Animatable.Image
              ref={"image"}
              source={
                this.state.active
                  ? this.props.activeImageSource
                  : this.props.imageSource
              }
            />
          </TouchableOpacity>

        </Animatable.View>
      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10
  },
  $inputHeight: "7.76%",
  buttonContainer: {
    width: "$inputHeight",
    height: "$inputHeight",
    backgroundColor: "$toolBarButtonColor",
    borderRadius: "$inputHeight",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4
  },
  imageContainer: {
    backgroundColor: "transparent",
    flex: 1,
    height: "$inputHeight",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ToolBarButton;
