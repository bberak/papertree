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
import OptionPicker from "./optionPicker";
import * as Help from "../utils/help"

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      filterByStartTime: false,
      filterByEndTime: false,
      startDate: null,
      endDate: null,
      systemsOpen: false,
      groupsOpen: false,
      systems: [],
      groups: [],
      selectedGroup: null,
      selectedSystem: null
    };
  }

  componentWillReceiveProps = (nextProps) => {
    let incomingFilter = nextProps.filter || {};
    let currentFilter = this.buildFilter();
    let same = Help.areFiltersTheSame(incomingFilter, currentFilter);

    if (!same && nextProps.selectedSearch != this.props.selectedSearch) {
      this.setState({
        filterByStartTime: incomingFilter.minTime ? true : false,
        startDate: incomingFilter.minTime ? new Date(incomingFilter.minTime) : null,
        filterByEndTime: incomingFilter.maxTime ? true : false,
        endDate: incomingFilter.maxTime ? new Date(incomingFilter.maxTime) : null,
        selectedGroup: incomingFilter.groupName ? { name: incomingFilter.groupName, id: incomingFilter.groupId } : null,
        selectedSystem: incomingFilter.systemName ? { name: incomingFilter.systemName, id: incomingFilter.systemId } : null
      });
    }
  }

  componentDidMount = () => {
    this.onRefresh();
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true
    });

    try {
      let results = await Promise.all([api.listGroups(), api.listSystems()]);
      let groups = results[0] || [];
      let systems = [{ name: "Any" }].concat(results[1] || []);

      this.setState({
        refreshing: false,
        groups: groups,
        systems: systems
      });
    } catch (error) {
      console.log(error);
      this.setState({
        refreshing: false
      });
    }
  };

  getSelectedGroup = () => {
    return this.state.selectedGroup || _.minBy(this.state.groups || [], "id");
  };

  getSelectedSystem = () => {
    return this.state.selectedSystem || this.state.systems[0];
  };

  onGroupSelected = id => {
    let group = (this.state.groups || []).find(x => x.id === id);

    this.setState({
      selectedGroup: group
    })
  };

  onSystemSelected = id => {
    let system = (this.state.systems || []).find(x => x.id === id);
    
    this.setState({
      selectedSystem: system
    })
  };

  buildFilter = () => {
    let filter = {};

    if (this.state.selectedGroup) {
      filter.groupId = this.state.selectedGroup.id;
      filter.groupName = this.state.selectedGroup.name
    }

    if (this.state.selectedSystem) {
      filter.systemId = this.state.selectedSystem.id;
      filter.systemName = this.state.selectedSystem.name;
    }

    if (this.state.filterByStartTime) {
      filter.minTime = this.state.startDate ? this.state.startDate.getTime() : null;
    }

    if (this.state.filterByEndTime) {
      filter.maxTime = this.state.endDate ? this.state.endDate.getTime() : null;
    }

    return filter;
  }

  onResetFilters = () => {
    this.setState({
      filterByStartTime: false,
      filterByEndTime: false,
      startDate: null,
      endDate: null,
      systemsOpen: false,
      groupsOpen: false,
      selectedGroup: null,
      selectedSystem: null
    })
  }

  onApplyFilters = () => {
    let newFilter = this.buildFilter();

    Actions.refresh({ key: "home", filter: newFilter, selectedSearch: null});
  }

  onOpenOrCloseStartTime = (v) => {
    this.setState({ 
      filterByStartTime: v, 
      startDate: v && this.state.startDate == null ? new Date() : this.state.startDate 
    });
  }

  onOpenOrCloseEndTime = (v) => {
    this.setState({ 
      filterByEndTime: v, 
      endDate: v && this.state.endDate == null ? new Date() : this.state.endDate 
    });
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

    const newFilter = this.buildFilter();
    const cannotFilter = Help.areFiltersTheSame(newFilter, this.props.filter);
    const cannotReset = Help.areFiltersTheSame(newFilter, {});
    const timeFiltersValid = Help.areTimeFiltersValid(newFilter);

    return (
      <View style={css.container}>

        <ScrollView refreshControl={refreshControl} style={css.scrollView}>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>TIME RANGE</Text>
          </View>

          <View style={css.sectionContainer}>

            <DatePickerAccordion
              label={"Starts"}
              open={this.state.filterByStartTime}
              onOpenOrClose={this.onOpenOrCloseStartTime}
              date={this.state.startDate || new Date()}
              onDateChange={date => this.setState({ startDate: date })}
              thumbTintColor={ timeFiltersValid ? undefined : "red"}
              onTintColor={ timeFiltersValid ? undefined : EStyleSheet.value("$filterItemBorderColor")}
            />

            <DatePickerAccordion
              label={"Ends"}
              open={this.state.filterByEndTime}
              onOpenOrClose={this.onOpenOrCloseEndTime}
              date={this.state.endDate || new Date()}
              onDateChange={date => this.setState({ endDate: date })}
              thumbTintColor={ timeFiltersValid ? undefined : "red"}
              onTintColor={ timeFiltersValid ? undefined : EStyleSheet.value("$filterItemBorderColor")}
              lastItem={true}
            />
          </View>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>GROUPS</Text>
          </View>

          <View style={css.sectionContainer}>
            <OptionPicker
              label={"Group"}
              value={this.getSelectedGroup()}
              values={this.state.groups}
              open={this.state.groupsOpen}
              onOpenOrClose={v => this.setState({ groupsOpen: v })}
              onValueChange={this.onGroupSelected}
            />
          </View>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>SYSTEMS</Text>
          </View>

          <View style={css.sectionContainer}>
            <OptionPicker
              label={"System"}
              value={this.getSelectedSystem()}
              values={this.state.systems}
              open={this.state.systemsOpen}
              onOpenOrClose={v => this.setState({ systemsOpen: v })}
              onValueChange={this.onSystemSelected}
            />
          </View>

        </ScrollView>

        <View style={css.buttonContainer}>

          <TouchableOpacity onPress={this.onResetFilters} activeOpacity={0.5} disabled={cannotReset}>
            <View style={css.button}>

              <Text style={[css.buttonText, {color: cannotReset ? EStyleSheet.value("$disabledLinkFontColor") : EStyleSheet.value("$warningColor")}]}>
                Reset
              </Text>

            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onApplyFilters} activeOpacity={0.5} disabled={cannotFilter}>
            <View style={css.button}>

              <Text style={[css.buttonText, {color: cannotFilter ? EStyleSheet.value("$disabledLinkFontColor") : EStyleSheet.value("$actionSheetButtonFontColor")}]}>
                Apply
              </Text>

            </View>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $buttonHeight: "8.54%",
  $buttonFontHeight: "3.3%",
  $headingTextHeight: "1.95%",
  container: {
    backgroundColor: "$filterBackgroundColor",
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0,
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
  },
  buttonContainer: {
    backgroundColor: "$secionContainerBackgroundColor",
    borderColor: "$filterItemBorderColor",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: -2 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0.07,
    shadowRadius: 4
  },
  button: {
    height: "$buttonHeight",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "$filterItemBorderColor",
    borderBottomWidth: 0.5
  },
  buttonText: {
    backgroundColor: "transparent",
    color: "$actionSheetButtonFontColor",
    fontSize: "$buttonFontHeight",
    letterSpacing: 0
  }
});

export default Filter;
