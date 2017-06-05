import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import LoginForm from "./loginForm";
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const LOGO_HEIGHT = 201;
const WINDOW_HEIGHT = Dimensions.get("window").height;

class Login extends Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(201);
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
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    let factor = event.endCoordinates.height / WINDOW_HEIGHT;
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

  render() {
    let form = this.props.loading
      ? <View style={css.activityIndicatorContainer}>
          <ActivityIndicator color={EStyleSheet.value("$indicatorColor")} />
        </View>
      : <LoginForm />;

    return (
      <Background animate={this.props.loggedIn === false}>

        <StatusBar hidden={false} barStyle="light-content" />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Animated.View
            style={[
              css.container,
              { paddingBottom: this.keyboardHeight }
            ]}
          >

            <View style={css.logoContainer} pointerEvents={"auto"}>
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
