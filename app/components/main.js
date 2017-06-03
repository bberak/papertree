import React, { Component } from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";
import EventList from "./eventList";
import Bookmark from "./bookmark";
import _ from "lodash";
import * as Help from "../utils/help";
import { connect } from "react-redux";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const statusBar = Platform.OS === "ios"
      ? <StatusBar
          hidden={this.props.settingsOpen || this.props.filterOpen}
          barStyle="light-content"
          animated={true}
          showHideTransition={"slide"}
        />
      : null;

    return (
      <View style={css.container}>

        {statusBar}

        <ToolBar
          searchTerm={this.props.searchTerm}
          settingsOpen={this.props.settingsOpen}
          filterOpen={this.props.filterOpen}
          filter={this.props.filter}
        />

        <EventList
          refreshing={this.props.refreshing}
          events={this.props.events}
          searchTerm={this.props.lastSearch}
          filter={this.props.filter}
          onRefresh={() => this.props.dispatch({ type: "REFRESH" })}
          onEndReached={() => this.props.dispatch({ type: "END_REACHED" })}
          onEndReachedThreshold={EStyleSheet.value("100%", "height")}
          selectedEvent={this.props.selectedEvent}
        />

        <Bookmark
          savedSearches={this.props.savedSearches}
          selectedSearch={this.props.selectedSearch}
          searchTerm={this.props.searchTerm}
          filter={this.props.filter}
        />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    backgroundColor: "$homeBackgroundColor",
    flexDirection: "column",
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "$shadowColor",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5
  }
});

export default connect(s => s)(Main);
