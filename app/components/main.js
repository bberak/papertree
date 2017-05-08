import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";
import EventList from "./eventList";
import Bookmark from "./bookmark"
import _ from "lodash";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      refreshing: true
    };
  }

  componentDidMount = () => {
    this.onSearch(this.props.searchTerm, this.props.filter);
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.searchTerm !== nextProps.searchTerm || _.isEqual(this.props.filter, nextProps.filter) === false) {
      this.onSearch(nextProps.searchTerm, nextProps.filter);
    }
  };

  onSearch = async (searchTerm, filter) => {
    this.setState({
      refreshing: true
    });

    try {
      let results = await api.search(searchTerm, filter);

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
      let minId = this.state.events && this.state.events.length > 0
        ? _.maxBy(this.state.events, "id").id //-- Searching head, therefore max id becomes the min param
        : null;
      let limit = 10000; //-- Try get as many events as you can - avoids polling
      let results = await api.search(
        this.props.searchTerm,
        this.props.filter,
        minId,
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
        let maxId = _.minBy(this.state.events, "id").id; //-- Seaching tail, therefore min id becomes the max param
        let results = await api.search(
          this.props.searchTerm,
          this.props.filter,
          null,
          maxId
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
    const statusBar = Platform.OS === "ios"
      ? <StatusBar
          hidden={this.props.settingsOpen}
          barStyle="light-content"
          animated={true}
          showHideTransition={"slide"}
        />
      : null;
    return (
      <View style={css.main}>

        {statusBar}

        <ToolBar
          searchTerm={this.props.searchTerm}
          settingsOpen={this.props.settingsOpen}
        />

        <EventList
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          events={this.state.events}
          searchTerm={this.props.searchTerm}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={EStyleSheet.value("100%", "height")}
        />

        <Bookmark 
          savedSearches={this.props.savedSearches} 
          selectedSearchId={this.props.selectedSearchId} 
          searchTerm={this.props.searchTerm}
          filter={this.props.filter}
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
    shadowRadius: 5
  }
});

export default Main;
