import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import DatePickerAccordion from "./datePickerAccordion";
import OptionAccordion from "./optionAccordion";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      filterByStartTime: false,
      filterByEndTime: false,
      startDate: new Date(),
      endDate: new Date(),
      systemsOpen: false,
      groupsOpen: false,
      systems: [],
      groups: []
    };
  }

  componentDidMount = () => {
    this.onRefresh();
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true
    });

    try {
      let results = await Promise.all([api.listGroups(), api.listSystems()]);
      let groups = results[0] || [];
      let systems = [{name: "Any"}].concat(results[1] || []);

      this.setState({
        refreshing: false,
        groups: groups,
        systems: systems,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        refreshing: false
      });
    }
  }

  getSelectedGroup = () => {
    let filter = this.props.filter || {};
    let propGroup = filter.groupName ? { id: filter.groupId, name: filter.groupName } : null;
    
    return propGroup || _.minBy(this.state.groups || [], "id"); 
  }

  getSelectedSystem = () => {
    let filter = this.props.filter || {};
    let propSystem = filter.systemName ? { id: filter.systemId, name: filter.systemName } : null;

    return propSystem || this.state.systems[0];
  }

  onStartDateChange = date => {
    let newFilter = Object.assign({}, this.props.filter, { minTime: date.getTime() });

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onEndDateChange = date => {
    let newFilter = Object.assign({}, this.props.filter, { maxTime: date.getTime() });

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onGroupSelected = id => {
    let group = (this.state.groups || []).find(x => x.id === id) || {};
    let newFilter = Object.assign({}, this.props.filter, { groupId: group.id, groupName: group.name});

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onSystemSelected = id => {
    let system = (this.state.systems || []).find(x => x.id === id) || {};
    let newFilter = Object.assign({}, this.props.filter, { systemId: system.id, systemName: system.name});

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  openOrCloseStartTimePicker = (v) => {
    this.setState({ filterByStartTime: v })

    if (!v) {
      let newFilter = Object.assign({}, this.props.filter, { minTime: null });

      Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
    }
  }

  openOrCloseEndTimePicker = (v) => {
    this.setState({ filterByEndTime: v })

    if (!v) {
      let newFilter = Object.assign({}, this.props.filter, { maxTime: null });

      Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
    } else {
      
    }
  }

  onClearTimeRangeFilers = () => {
    this.setState({
      filterByStartTime: false,
      filterByEndTime: false
    });

    let newFilter = Object.assign({}, this.props.filter, { minTime: null, maxTime: null });

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onClearInfrastructureFilters = () => {
    this.setState({
      groupsOpen: false,
      systemsOpen: false
    });

    let newFilter = Object.assign({}, this.props.filter);
    newFilter.groupId = null;
    newFilter.groupName = null;
    newFilter.systemId = null;
    newFilter.systemName = null;

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  render() {
    let refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        tintColor={EStyleSheet.value("$filterIndicatorColor")}
        colors={[
          EStyleSheet.value("$secondaryColor"),
          EStyleSheet.value("$primaryColor")
        ]}
        onRefresh={this.onRefresh}
      />
    );

    return (
      <View style={css.container}>

        <ScrollView refreshControl={refreshControl} style={css.scrollView}>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>TIME RANGE</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onClearTimeRangeFilers}
            >
              <Text style={css.headingText}>CLEAR</Text>
            </TouchableOpacity>
          </View>

          <View style={css.sectionContainer}>

            <DatePickerAccordion
              label={"Starts"}
              open={this.state.filterByStartTime}
              onOpenOrClose={this.openOrCloseStartTimePicker}
              date={(this.props.filter || {}).minTime ? new Date(this.props.filter.minTime) : new Date()}
              onDateChange={this.onStartDateChange}
            />

            <DatePickerAccordion
              label={"Ends"}
              open={this.state.filterByEndTime}
              onOpenOrClose={this.openOrCloseEndTimePicker}
              date={(this.props.filter || {}).maxTime ? new Date(this.props.filter.maxTime) : new Date()}
              onDateChange={this.onEndDateChange}
              borderContainerStyle={{
                borderTopWidth: this.state.filterByStartTime ? 0.5 : 0,
                borderBottomWidth: this.state.filterByEndTime ? 0.5 : 0
              }}
            />
          </View>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>INFRASTRUCTURE</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onClearInfrastructureFilters}
            >
              <Text style={css.headingText}>RESET</Text>
            </TouchableOpacity>
          </View>

          <View style={css.sectionContainer}>
            <OptionAccordion
              label={"Group"}
              value={this.getSelectedGroup()}
              values={this.state.groups}
              open={this.state.groupsOpen}
              onOpenOrClose={v => this.setState({ groupsOpen: v })}
              onValueChange={this.onGroupSelected}
            />
            <OptionAccordion
              label={"System"}
              value={this.getSelectedSystem()}
              values={this.state.systems}
              open={this.state.systemsOpen}
              onOpenOrClose={v => this.setState({ systemsOpen: v })}
              borderContainerStyle={{
                borderTopWidth: this.state.groupsOpen ? 0.5 : 0,
                borderBottomWidth: this.state.systemsOpen ? 0.5 : 0
              }}
              onValueChange={this.onSystemSelected}
            />
          </View>

        </ScrollView>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $headingTextHeight: "1.95%",
  container: {
    backgroundColor: "$filterBackgroundColor",
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "$shadowColor",
    shadowOpacity: 1,
    shadowRadius: 5
  },
  heading: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingTop: "5%",
    paddingBottom: "1%"
  },
  headingText: {
    fontSize: "$headingTextHeight",
    color: "$filterHeadingFontColor",
    letterSpacing: 1.2,
    fontWeight: "600"
  },
  sectionContainer: {
    backgroundColor: "$secionContainerBackgroundColor",
    borderColor: "$filterItemBorderColor",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0.07,
    shadowRadius: 4
  }
});

export default Filter;
