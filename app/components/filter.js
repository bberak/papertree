import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./button";
import Label from "./label";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Collapsible from "react-native-collapsible";
import SwitchLabel from "./switchLabel";
import OptionCarousel from "./optionCarousel";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      filterByStartTime: false,
      filterByEndTime: false,
      startDate: new Date(),
      endDate: new Date()
    };
  }

  componentDidMount = () => {
    this.onRefresh();
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true
    });

    try {
      let results = await api.listSearches();

      this.setState({
        refreshing: false
      });

      Actions.refresh({ key: "home", savedSearches: results });
    } catch (error) {
      console.log(error);
      this.setState({
        refreshing: false
      });
    }
  };

  onStartDateChange = date => {
    this.setState({ startDate: date });
  };

  onEndDateChange = date => {
    this.setState({ endDate: date });
  };

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
            <SwitchLabel
              label={"Starts"}
              value={this.state.filterByStartTime}
              onValueChange={v => this.setState({ filterByStartTime: v })}
            />

            <Collapsible collapsed={!this.state.filterByStartTime}>
              <DatePickerIOS
                date={this.state.startDate}
                mode="datetime"
                onDateChange={this.onStartDateChange}
                minuteInterval={5}
              />
            </Collapsible>

            <SwitchLabel
              label={"Ends"}
              value={this.state.filterByEndTime}
              onValueChange={v => this.setState({ filterByEndTime: v })}
              borderContainerStyle={{borderTopWidth: this.state.filterByStartTime ? 0.5 : 0}}
            />

            <Collapsible collapsed={!this.state.filterByEndTime}>
              <DatePickerIOS
                date={this.state.endDate}
                mode="datetime"
                onDateChange={this.onEndDateChange}
                minuteInterval={5}
              />
            </Collapsible>
          </View>

          <View style={css.heading}>
            <Text style={[css.headingText, { flex: 1 }]}>INFRASTRUCTURE</Text>
            <Text style={css.headingText}>RESET</Text>
          </View>

          <View style={css.sectionContainer}>
            <OptionCarousel label={"Systems"} />
            <OptionCarousel label={"Groups"} borderContainerStyle={{borderBottomWidth: 0}} />
          </View>

        </ScrollView>

        <View style={css.buttonContainer} />

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    backgroundColor: "#F9F9FA",
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
    fontSize: 13,
    color: "#BBBBBB",
    letterSpacing: 1.2,
    fontWeight: "600"
  },
  sectionContainer: {
    backgroundColor: "#FFF",
    borderColor: "$filterItemBorderColor",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "$shadowColor",
    shadowOpacity: 0.07,
    shadowRadius: 4
  },
  labelStyle: {
    marginTop: "5%",
    color: "$primaryColor",
    opacity: 1,
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: "transparent",
    textShadowRadius: 0
  },
  logo: {
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "5%"
  },
  scrollView: {
    flex: 1
  },
  listContainer: {
    marginBottom: "5%"
  },
  buttonContainer: {
    marginHorizontal: "7%",
    marginBottom: "2%"
  }
});

export default Filter;
