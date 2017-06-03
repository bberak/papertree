import React, { Component } from "react";
import { Text, ListView, RefreshControl } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import EventListSection from "./eventListSection";
import EventListRow from "./eventListRow";
import _ from "lodash";
import Label from "./label";
import * as Help from "../utils/help";

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
    if (
      this.props.searchTerm !== nextProps.searchTerm ||
      Help.areFiltersDifferent(this.props.filter, nextProps.filter) ||
      this.props.selectedEvent !== nextProps.selectedEvent
    ) {
      this.refs.list.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  buildDataSource(data) {
    let groups = _.chain(data || [])
      .orderBy(["received_at"], ["desc"])
      .groupBy(x => `${x.display_received_at}#${x.hostname}#${x.program}`)
      .map((group, key) => {
        return {
          id: key,
          display_received_at: group[0].display_received_at,
          events: _.chain(group)
            .orderBy(["id"])
            .map((e, idx) => {
              return {
                id: e.id,
                message: e.message,
                hostname: e.hostname,
                program: e.program,
                isFirst: idx === 0,
                selected: e.id === (this.props.selectedEvent || {}).id,
                onLongPress: this.props.onEventSelected
              };
            })
            .value()
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
        display_received_at: group.display_received_at
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
  }

  render() {

    return (
      <ListView
        ref={"list"}
        style={css.list}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            tintColor={EStyleSheet.value("$indicatorColor")}
            colors={[
              EStyleSheet.value("$secondaryColor"),
              EStyleSheet.value("$primaryColor")
            ]}
            onRefresh={this.props.onRefresh}
          />
        }
        dataSource={this.buildDataSource(this.props.events)}
        renderRow={event => <EventListRow {...event} />}
        renderSectionHeader={section => (
          <EventListSection value={section.display_received_at} />
        )}
        stickySectionHeadersEnabled={true}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
      />
    );
  }
}

const css = EStyleSheet.create({
  $paddingHorizontal: "3.94%",
  $marginHorizontal: "3.94%",
  list: {
    "@media ios": {
      paddingHorizontal: "$paddingHorizontal"
    },
    "@media android": {
      marginHorizontal: "$marginHorizontal"
    }
  }
});

export default EventList;
