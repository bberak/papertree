import React, { Component } from "react";
import { Text, ListView, RefreshControl } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";

const ds = new ListView.DataSource({
  getSectionData: (blob, sectionId) => blob[sectionId],
  getRowData: (blob, sectionId, rowId) => blob[sectionId + ":" + rowId],
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
  sectionHeaderHasChanged: (s1, s2) => s1.id !== s2.id
});

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchTerm !== nextProps.searchTerm)
      this.refs.list.scrollTo({x: 0, y: 0, animated: true})
  }

  buildDataSource(data) {
    let groups = _.chain(data || [])
      .orderBy(["received_at"], ["desc"])
      .groupBy(x => `${x.display_received_at}#${x.hostname}#${x.program}`)
      .map((group, key) => {
        return {
          id: key,
          hostname: group[0].hostname,
          program: group[0].program,
          display_received_at: group[0].display_received_at,
          events: _.map(group, e => {
            return { id: e.id, message: e.message };
          })
        };
      })
      .value();

    let blob = {};
    let sectionIds = [];
    let rowIds = [];

    for (i = 0; i < groups.length; i++) {
      let group = groups[i];

      sectionIds.push(group.id);

      blob[group.id] = {
        id: group.id,
        display_received_at: group.display_received_at,
        hostname: group.hostname,
        program: group.program
      };

      rowIds.push([]);

      let events = group.events;

      for (j = 0; j < events.length; j++) {
        let event = events[j];

        rowIds[i].push(event.id);

        blob[group.id + ":" + event.id] = event;
      }
    }

    return ds.cloneWithRowsAndSections(blob, sectionIds, rowIds);
  };

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
        ref={"list"}
        refreshControl={refreshControl}
        dataSource={this.buildDataSource(this.props.events)}
        renderRow={event => <Text>{event.message}</Text>}
        renderSectionHeader={section => (
          <Text style={{fontWeight: "bold"}}>{section.display_received_at}</Text>
        )}
        stickySectionHeadersEnabled={true}
      />
    );
  }
}

const css = EStyleSheet.create({});

export default EventList;
