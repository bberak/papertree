import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";
import EventList from "./eventList";
import _ from "lodash";
import Drawer from "react-native-drawer";
import Settings from "./settings";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filter: {},
      events: [],
      savedSearches: [],
      refreshing: true,
      settingsOpen: false
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
    return (
      <Drawer
        ref={"drawer"}
        content={<Settings />}
        type={"static"}
        openDrawerOffset={0.25}
        elevation={5}
        tapToClose={true}
        panOpenMask={0.2}
        open={this.state.settingsOpen}
        onOpenStart={() => {
          this.setState({
            settingsOpen: true
          });
        }}
        onCloseStart={() => {
          this.setState({
            settingsOpen: false
          });
        }}
      >

        <View style={css.main}>

          <StatusBar
            hidden={this.state.settingsOpen}
            barStyle="light-content"
            animated={true}
            showHideTransition={"slide"}
          />

          <ToolBar
            searchTerm={this.state.searchTerm}
            onSearch={this.onSearch}
            settingsActive={this.state.settingsOpen}
            onSettingsPress={() => {
              this.setState({
                settingsOpen: !this.state.settingsOpen
              });
            }}
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

      </Drawer>
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
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  }
});

export default Home;
