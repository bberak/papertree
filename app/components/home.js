import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ListView,
  RefreshControl
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filter: {},
      events: ds.cloneWithRows([]),
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
        events: ds.cloneWithRows(results.events),
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
    let refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        tintColor={EStyleSheet.value("$indicatorColor")}
        colors={[
          EStyleSheet.value("$secondaryColor"),
          EStyleSheet.value("$primaryColor")
        ]}
        onRefresh={this.onRefresh}
      />
    );

    return (
      <View style={css.mainView}>

        <StatusBar hidden={false} barStyle="light-content" />

        <ToolBar searchTerm={this.state.searchTerm} onSearch={this.onSearch} />

        <ListView
          refreshControl={refreshControl}
          dataSource={this.state.events}
          renderRow={event => <Text>{event.message}</Text>}
          enableEmptySections={true}
        />
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
