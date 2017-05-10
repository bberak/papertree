import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Linking,
  DatePickerIOS,
  Switch, 
  Picker
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Button from "./button";
import Label from "./label";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Collapsible from "react-native-collapsible";
import SwitchLabel from "./switchLabel";

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

    return (
      <View style={css.container}>

        <ScrollView
          refreshControl={refreshControl}
          style={css.scrollView}
        >

        <Label value={"Time Filters"} />

   
          <SwitchLabel
            label={this.state.filterByStartTime ? "Start Time: " + this.state.date.toISOString() : "Starting from.. "}
            value={this.state.filterByStartTime}
            onValueChange={v => this.setState({ filterByStartTime: v })}
          />

          <Collapsible collapsed={!this.state.filterByStartTime}>
            <DatePickerIOS
              date={this.state.date}
              mode="datetime"
              onDateChange={this.onDateChange}
              minuteInterval={5}
            />
          </Collapsible>
    

          <Label value={"Group Filter"} />

          <Picker
            //style={styles.picker}
            selectedValue={this.state.selected1}
            onValueChange={() => alert("Picked")}>
            <Picker.Item label="System Abc" value="123" />
            <Picker.Item label="System 123" value="abc" />
          </Picker>

          <Label value={"System Filter"} />

          <Picker
            //style={{marginTop: -50, padding: 0, backgroundColor: "blue", height: 1, justifyContent: "flex-start"}}
            selectedValue={this.state.selected1}
            onValueChange={() => alert("Picked")}>
            <Picker.Item label="System Abc" value="123" />
            <Picker.Item label="System 123" value="abc" />
            <Picker.Item label="System Abc" value="123" />
            <Picker.Item label="System 123" value="abc" />
            <Picker.Item label="System Abc" value="123" />
            <Picker.Item label="System 123" value="abc" />
          </Picker>

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
