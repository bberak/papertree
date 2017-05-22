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
    this.setState({ startDate: date });
  }

  onEndDateChange = date => {
    this.setState({ endDate: date });
  }

  onGroupSelected = id => {
    let group = (this.state.groups || []).find(x => x.id === id);
    let newFilter = Object.assign({}, this.props.filter, { groupId: group.id, groupName: group.name});

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onSystemSelected = id => {
    let system = (this.state.systems || []).find(x => x.id === id);
    let newFilter = Object.assign({}, this.props.filter, { systemId: system.id, systemName: system.name});

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null });
  }

  onClearInfrastructureFilters = () => {
    this.setState({
      groupsOpen: false,
      systemsOpen: false
    });

    Actions.refresh({ key: "home", filter: null, selectedSearch: null });
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
              onPress={() => {
                this.setState({
                  filterByStartTime: false,
                  filterByEndTime: false,
                  startDate: new Date(),
                  endDate: new Date()
                });
              }}
            >
              <Text style={css.headingText}>CLEAR</Text>
            </TouchableOpacity>
          </View>

          <View style={css.sectionContainer}>

            <DatePickerAccordion
              label={"Starts"}
              open={this.state.filterByStartTime}
              onOpenOrClose={v => this.setState({ filterByStartTime: v })}
              date={this.state.startDate}
              onDateChange={this.onStartDateChange}
            />

            <DatePickerAccordion
              label={"Ends"}
              open={this.state.filterByEndTime}
              onOpenOrClose={v => this.setState({ filterByEndTime: v })}
              date={this.state.endDate}
              onDateChange={this.onEndDateChange}
              borderContainerStyle={{
                borderTopWidth: this.state.filterByStartTime ? 0.5 : 0
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
                borderTopWidth: this.state.groupsOpen ? 0.5 : 0
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
