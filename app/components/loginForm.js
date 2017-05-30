import React, { Component } from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from "react-native-animatable";
import TextBox from "./textBox";
import Button from "./button";
import Label from "./label";
import Link from "./link";
import { connect } from "react-redux";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loggedIn) {
      this.setState({
        email: "",
        password: ""
      })
    } 
  }

  onLogin = async () => {
    this.props.dispatch({ type: "LOGIN", email: this.state.email, password: this.state.password });
  };

  onCreateAccount = () => {
    this.props.dispatch({ type: "CREATE_ACCOUNT" });
  };

  render() {
    return (
      <Animatable.View animation={"fadeIn"} ref={"form"} style={css.form}>

        <Animatable.View ref={"textBoxes"} animation={this.props.loginFailed ? "shake" : null} duration={400}>

          <TextBox
            ref={"email"}
            placeholder={"Email"}
            value={this.state.email}
            autoCorrect={false}
            returnKeyType={"next"}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            containerStyle={css.margin}
            onSubmitEditing={() => this.refs.password.focus()}
            onChangeText={text => this.setState({ email: text })}
          />

          <TextBox
            ref={"password"}
            placeholder={"Password"}
            secureTextEntry={true}
            value={this.state.password}
            autoCorrect={false}
            returnKeyType={"done"}
            autoCapitalize={"none"}
            containerStyle={css.margin}
            onSubmitEditing={this.onLogin}
            onChangeText={text => this.setState({ password: text })}
          />

        </Animatable.View>

        <Button
          value={this.props.attemptingLogin ? "Connecting.." : "Login"}
          onPress={this.onLogin}
          disabled={this.props.attemptingLogin}
          containerStyle={css.margin}
        />
        <Label value={"or"} />
        <Link value={"Create Account"} onPress={this.onCreateAccount} />

      </Animatable.View>
    );
  }
}

const css = EStyleSheet.create({
  form: {
    flex: 1
  },
  margin: {
    marginHorizontal: "10%"
  }
});

export default connect(s => s)(LoginForm);
