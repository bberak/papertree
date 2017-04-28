import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";
import EventList from "./eventList";
import _ from "lodash";

class Main extends Component {
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
      this.setState({
        refreshing: false
      });
    }
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true
    });

    try {
      let min_id = this.state.events && this.state.events.length > 0
        ? _.maxBy(this.state.events, "id").id //-- Searching by head, therefore max id becomes the min param
        : null;
      let limit = 10000; //-- Try get as many events as you can - avoids polling
      let results = await api.search(
        this.state.searchTerm,
        this.state.filter,
        min_id,
        null,
        limit
      );

      this.setState({
        events: (this.state.events || []).concat(results.events || []),
        refreshing: false
      });
    } catch (error) {
      console.log(error);

      this.setState({
        refreshing: false
      });
    }
  };

  onEndReached = async () => {
    if (this.state.events && this.state.events.length > 0) {
      try {
        let max_id = _.minBy(this.state.events, "id").id; //-- Seaching tail, therefore min id becomes the max param
        let results = await api.search(
          this.state.searchTerm,
          this.state.filter,
          null,
          max_id
        );

        this.setState({
          events: (this.state.events || []).concat(results.events || []),
          refreshing: false
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const statusBar = Platform.OS === "ios" ?
      <StatusBar
          hidden={this.props.settingsOpen}
          barStyle="light-content"
          animated={true}
          showHideTransition={"slide"}
        /> :
        null;

    return (
      <View style={css.main}>

        {statusBar}

        <ToolBar
          searchTerm={this.state.searchTerm}
          onSearch={this.onSearch}
          settingsActive={this.props.settingsOpen}
          onSettingsPress={this.props.onSettingsPress}
        />

        <EventList
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          events={this.state.events}
          searchTerm={this.state.searchTerm}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={EStyleSheet.value("50%", "height")}
        />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  main: {
    backgroundColor: "$homeBackgroundColor",
    flexDirection: "column",
    flex: 1,
    shadowOffset: { width: -5, height: 0 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5
  }
});

export default Main;
