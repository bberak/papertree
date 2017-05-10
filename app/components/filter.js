import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  DatePickerIOS
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./button";
import Label from "./label";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Collapsible from "react-native-collapsible";
import SwitchLabel from "./switchLabel";
import Carousel from "react-native-snap-carousel";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
        tintColor={EStyleSheet.value("$indicatorColor")}
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

          <Label value={"Time Filters"} />

          <SwitchLabel
            label={"Start Time"}
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
            label={"End Time"}
            value={this.state.filterByEndTime}
            onValueChange={v => this.setState({ filterByEndTime: v })}
          />

          <Collapsible collapsed={!this.state.filterByEndTime}>
            <DatePickerIOS
              date={this.state.endDate}
              mode="datetime"
              onDateChange={this.onEndDateChange}
              minuteInterval={5}
            />
          </Collapsible>

          <Label value={"Group Filter"} />

          <Carousel
            showsHorizontalScrollIndicator={false}
            sliderWidth={EStyleSheet.value("75%", "width")}
            itemWidth={EStyleSheet.value("30%", "width")}
            inactiveSlideOpacity={0.5}
            inactiveSlideScale={0.7}
          >

            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 1
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 2
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 3
            </Text>

          </Carousel>

          <Label value={"System Filter"} />

          <Carousel
            showsHorizontalScrollIndicator={false}
            sliderWidth={EStyleSheet.value("75%", "width")}
            itemWidth={EStyleSheet.value("30%", "width")}
            inactiveSlideOpacity={0.5}
            inactiveSlideScale={0.7}
          >

            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 1
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 2
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 3
            </Text>

          </Carousel>

        </ScrollView>

        <View style={css.buttonContainer}>
          <Button
            disabled={false}
            value={"Filter"}
            onPress={() => alert("Filter!")}
          />
        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1
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
