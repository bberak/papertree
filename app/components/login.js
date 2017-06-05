import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import LoginForm from "./loginForm";
import { connect } from "react-redux";
import Orientation from "react-native-orientation";

const LOGO_HEIGHT = 201;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPortrait: false
    };

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(LOGO_HEIGHT);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );

    this.updateOrientationState(Orientation.getInitialOrientation());
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    let factor = event.endCoordinates.height / Dimensions.get("window").height;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: (1 - factor) * LOGO_HEIGHT
      })
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: LOGO_HEIGHT
      })
    ]).start();
  };

  updateOrientationState = orientation => {
    if (orientation !== "PORTRAIT" && orientation !== "PORTRAITUPSIDEDOWN") {
      this.setState({
        isPortrait: false
      });
    } else {
      this.setState({
        isPortrait: true
      });
    }
  };

  onLayout = () => {
    const { width, height } = Dimensions.get("window")
    this.updateOrientationState(height > width ? "PORTRAIT" : "LANDSCAPE")
  }

  render() {
    if (this.state.isPortrait) return this.renderInPortraitMode();
    else return this.renderInLandscapeMode();
  }

  renderInPortraitMode() {
    let form = this.props.loading
      ? <View style={css.activityIndicatorContainer}>
          <ActivityIndicator color={EStyleSheet.value("$indicatorColor")} />
        </View>
      : <LoginForm />;

    return (
      <Background animate={this.props.loggedIn === false}>

        <StatusBar hidden={false} barStyle="light-content" />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} onLayout={this.onLayout}>

          <Animated.View
            style={[css.container, { paddingBottom: this.keyboardHeight }]}
          >

            <View style={css.logoContainer}>
              <Animated.Image
                resizeMode={"contain"}
                source={require("../images/logo.png")}
                style={[{ height: this.imageHeight }]}
              />
            </View>

            <View style={css.formContainer}>
              {form}
            </View>

          </Animated.View>

        </TouchableWithoutFeedback>

      </Background>
    );
  }

  renderInLandscapeMode() {
    return (
      <Background animate={this.props.loggedIn === false}>

        <StatusBar hidden={false} barStyle="light-content" />

        <Animated.View
          style={[css.container, { paddingBottom: this.keyboardHeight }]} onLayout={this.onLayout}
        >

          <View style={[css.logoContainer, { flex: 1 }]}>
            <Animated.Image
              resizeMode={"contain"}
              source={require("../images/logo.png")}
              style={[{ height: this.imageHeight }]}
            />
          </View>

        </Animated.View>

      </Background>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flex: 0.5
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(s => s)(Login);
