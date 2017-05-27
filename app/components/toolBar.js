import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import TextBox from "./textBox";
import ToolBarButton from "./toolBarButton";
import { Actions } from "react-native-router-flux"
import FilterActionSheet from "./filterActionSheet";
import * as Help from "../utils/help"

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      searchTerm: nextProps.searchTerm
    })
  }

  onSubmitEditing = () => {
    if (this.props.searchTerm !== this.state.searchTerm)
      Actions.refresh({key: "home", searchTerm: this.state.searchTerm, selectedSearch: null})
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
    if (this.props.searchTerm)
      Actions.refresh({key: "home", searchTerm: "", selectedSearch: null})
  }

  render() {

    const settingsImage = require("../images/cog.png");
    const filterUsed = Help.areFiltersDifferent(this.props.filter, {});
    const filterImage = filterUsed ? require("../images/filter-active.png") : require("../images/filter.png");

    return (
      <View style={css.container}>

        <ToolBarButton
          active={this.props.settingsOpen}
          containerStyle={css.buttonContainerStyle}
          imageSource={settingsImage}
          activeImageSource={settingsImage}
          onPress={() => Actions.refresh({key: "home", settingsOpen: !this.props.settingsOpen})}
        />

        <TextBox
          containerStyle={css.textBoxContainerStyle}
          placeholder={"Search"}
          value={this.state.searchTerm}
          autoCorrect={false}
          returnKeyType={"search"}
          autoCapitalize={"none"}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          onBlur={this.onSubmitEditing}
          onClear={this.onClear}
        />

        <ToolBarButton
          active={this.props.filterOpen}
          containerStyle={css.buttonContainerStyle}
          imageSource={filterImage}
          activeImageSource={filterImage}
          onPress={() => Actions.refresh({key: "home", filterOpen: !this.props.filterOpen})}
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
