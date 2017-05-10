import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl, Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import Button from "./button";
import Label from "./label";
import Link from "./link";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { DatePicker } from "react-native-wheel-picker-android";
import Carousel from "react-native-snap-carousel";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      date: new Date()
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

  linkPressed = s => {
    if (s.id === (this.props.selectedSearch || {}).id) {
      Actions.refresh({
        key: "home",
        selectedSearch: null,
        searchTerm: null,
        filter: null,
        settingsOpen: false
      });
    } else {
      Actions.refresh({
        key: "home",
        selectedSearch: s,
        searchTerm: s.query,
        filter: { groupId: s.group.id, groupName: s.group.name },
        settingsOpen: false
      });
    }
  };

  onDateChange = date => {
    this.setState({ date: date });
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

    let searchItems = this.props.savedSearches &&
      this.props.savedSearches.length > 0
      ? _.chain(this.props.savedSearches)
          .orderBy(["id"], ["desc"])
          .map(x => {
            let selected = x.id === (this.props.selectedSearch || {}).id;
            let color = EStyleSheet.value(
              selected ? "$secondaryColor" : "$linkFontColor"
            );
            return (
              <Link
                key={x.id}
                value={x.name}
                color={color}
                onPress={() => this.linkPressed(x)}
              />
            );
          })
          .value()
      : <Link value={"* * *"} disabled={true} />;

    return (
      <View style={css.container}>

        <ScrollView
          // refreshControl={refreshControl}
          style={css.scrollView}
        >

          <Label value={"Time Filters"} />

          <DatePicker initDate={new Date().toISOString()} />

          <Label value={"Saved Searches"} />

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
                height: 40,
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 1
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                height: 40,
                textAlign: "center",
                width: EStyleSheet.value("30%", "width")
              }}
            >
              System 2
            </Text>
            <Text
              style={{
                backgroundColor: "red",
                height: 40,
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
            value={"Apply Filter"}
            onPress={api.logout}
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
