import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";
import EventList from "./eventList"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filter: {},
      events: [],
      savedSearches: [],
      refreshing: true
    };
  }

  componentDidMount = () => {
    this.onSearch(this.state.searchTerm);
  };

  onSearch = async searchTerm => {
    this.setState({
      searchTerm: searchTerm,
      refreshing: true
    });

    try {
      let results = await api.search(searchTerm, this.state.filter);

      this.setState({
        events: results.events,
        refreshing: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  onRefresh = () => {
    this.setState({
      refreshing: true
    });

    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 4000);
  };

  render() {
    return (
      <View style={css.mainView}>

        <StatusBar hidden={false} barStyle="light-content" />

        <ToolBar searchTerm={this.state.searchTerm} onSearch={this.onSearch} />

        <EventList onRefresh={this.onRefresh} refreshing={this.state.refreshing} events={this.state.events} searchTerm={this.state.searchTerm} />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  mainView: {
    backgroundColor: "$homeBackgroundColor",
    flexDirection: "column",
    flex: 1
  }
});

export default Home;
