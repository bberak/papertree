import React, { Component } from "react";
import {
  Text,
  ListView,
  RefreshControl
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ToolBar from "./toolBar";
import api from "../utils/papertrailApi";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
});

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let refreshControl = (
      <RefreshControl
        refreshing={this.props.refreshing}
        tintColor={EStyleSheet.value("$indicatorColor")}
        colors={[
          EStyleSheet.value("$secondaryColor"),
          EStyleSheet.value("$primaryColor")
        ]}
        onRefresh={this.props.onRefresh}
      />
    );

    return (

        <ListView
          refreshControl={refreshControl}
          dataSource={ds.cloneWithRows(this.props.events)}
          renderRow={event => <Text>{event.message}</Text>}
          enableEmptySections={true}
        />
    );
  }
}

const css = EStyleSheet.create({

});

export default EventList;
