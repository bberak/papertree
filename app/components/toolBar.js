import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import TextBox from "./textBox";
import ToolBarButton from "./toolBarButton";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm
    };
  }

  onTryLogin = async () => {
    if (this.state.email && this.state.password) {
      try {
        this.setState({ connecting: true });
        await api.login(this.state.email, this.state.password);
        Actions.home();
      } catch (error) {
        this.setState({ connecting: false });
        this.refs.textBoxes.shake(400);
      }
    } else this.refs.textBoxes.shake(400);
  };

  onCreateAccount = () => {
    Browser.openURL("https://papertrailapp.com/signup?plan=free");
  };

  onSubmitEditing = () => {
    if (this.props.searchTerm != this.state.searchTerm)
      this.props.onSearch(this.state.searchTerm);
  }

  onChangeText = (text) =>{
    this.setState({
      searchTerm: text
    })
  }

  onClear = () => {
    this.setState({
      searchTerm: ""
    })
    if (this.props.searchTerm != "")
      this.props.onSearch("");
  }

  render() {
    return (
      <View style={css.container}>

        <ToolBarButton
          containerStyle={css.buttonContainerStyle}
          imageSource={require("../images/cog.png")}
          activeImageSource={require("../images/cog-active.png")}
        />

        <TextBox
          containerStyle={css.textBoxContainerStyle}
          placeholder={"Search"}
          value={this.state.searchTerm}
          autoCorrect={false}
          returnKeyType={"search"}
          autoCapitalize={"none"}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
          onClear={this.onClear}
        />

        <ToolBarButton
          containerStyle={css.buttonContainerStyle}
          imageSource={require("../images/filter.png")}
          activeImageSource={require("../images/filter-active.png")}
        />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 20 : 5,
    flexDirection: "row",
    paddingBottom: 5
  },
  textBoxContainerStyle: {
    flex: 1
  },
  buttonContainerStyle: {
    marginHorizontal: "4.23%"
  }
});

export default ToolBar;
