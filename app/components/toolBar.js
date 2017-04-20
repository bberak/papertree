import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import TextBox from "./textBox";
import ToolBarButton from "./toolBarButton";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm,
      settingsActive: false,
      filterActive: false
    };
  }

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
          active={this.state.settingsActive}
          containerStyle={css.buttonContainerStyle}
          imageSource={require("../images/cog.png")}
          activeImageSource={require("../images/cog-active.png")}
          onPress={() => this.setState({ settingsActive: !this.state.settingsActive})}
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
          active={this.state.filterActive}
          containerStyle={css.buttonContainerStyle}
          imageSource={require("../images/filter.png")}
          activeImageSource={require("../images/filter-active.png")}
          onPress={() => this.setState({ filterActive: !this.state.filterActive})}
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
