import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background"

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
     <Background>

        <Text style={{ backgroundColor: "transparent", textAlign: "center"}}>Settings</Text>

      </Background>
    );
  }
}

const css = EStyleSheet.create({

});

export default Settings;
