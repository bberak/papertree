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

  componentDidMount = () => {
    return;
    this.onSearch(this.props.searchTerm, this.props.filter);
  };

  componentWillReceiveProps = nextProps => {
    return;
    if (
      this.props.searchTerm !== nextProps.searchTerm ||
      Help.areFiltersDifferent(this.props.filter, nextProps.filter) ||
      this.props.selectedEvent !== nextProps.selectedEvent
    ) {
      this.onSearch(
        nextProps.searchTerm,
        nextProps.filter,
        nextProps.selectedEvent
      );
    }
  };

  onSearch = async (searchTerm, filter, selectedEvent) => {
    return;
    this.setState({
      refreshing: true
    });

    if (selectedEvent) {
      //-- Display the sibling, then find the youngest and
      //-- retrieve older events.

      this.setState({
        events: selectedEvent.siblings
      });

      try {
        let maxId = _.maxBy(selectedEvent.siblings, "id").id;
        let results = await api.search(null, null, null, maxId, 20);

        this.setState({
          events: _.uniqBy(selectedEvent.siblings.concat(results.events), "id"),
          refreshing: false
        });
      } catch (error) {
        console.log(error);

        this.setState({
          events: [],
          refreshing: false
        });
      }
    } else {
      try {
        let results = await api.search(searchTerm, filter);

        this.setState({
          events: results.events,
          refreshing: false
        });
      } catch (error) {
        console.log(error);

        this.setState({
          events: [],
          refreshing: false
        });
      }
    }
  };

  onRefresh = async () => {
    return;
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
        events: _.uniqBy(
          (this.state.events || []).concat(results.events || []),
          "id"
        ),
        refreshing: false
      });
    } catch (error) {
      console.log(error);

      this.setState({
        events: [],
        refreshing: false
      });
    }
  };

  onEndReached = async () => {
    return;
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
          events: _.uniqBy(
            (this.state.events || []).concat(results.events || []),
            "id"
          ),
          refreshing: false
        });
      } catch (error) {
        console.log(error);

        this.setState({
          events: [],
          refreshing: false
        });
      }
    }
  };

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
          onRefresh={() => this.props.dispatch({ type: "REFRESH", lastSearch: this.props.lastSearch, filter: this.props.filter, events: this.props.events})}
          onEndReached={() => this.props.dispatch({ type: "END_REACHED", lastSearch: this.props.lastSearch, filter: this.props.filter, events: this.props.events})}
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
