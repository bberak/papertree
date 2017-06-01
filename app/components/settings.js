import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Linking
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import Button from "./button";
import Label from "./label";
import Link from "./link";
import api from "../utils/papertrailApi";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
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

  render() {
    let refreshControl = (
      <RefreshControl
        refreshing={this.props.refreshingSavedSearches}
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
      ? _.chain(this.props.savedSearches).orderBy(["id"], ["desc"]).map(x => {
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
        }).value()
      : <Link value={"* * *"} disabled={true} />;

    return (
      <Background>

        <Image style={css.logo} source={require("../images/logo-small.png")} />

        <Label value={"Saved Searches"} />

        <ScrollView refreshControl={refreshControl} style={css.scrollView}>

          <View style={css.listContainer}>
            {searchItems}
          </View>

          <Label value={"Support"} />
          <Link
            value={"papertree.io"}
            onPress={() => Linking.openURL("https://papertree.io")}
          />
          <Link
            value={"papertrailapp.com"}
            onPress={() => Linking.openURL("https://papertrailapp.com")}
          />

        </ScrollView>

        <View style={css.buttonContainer}>
          <Button value={"Logout"} onPress={() => this.props.dispatch({ type: "LOGOUT" })} />
        </View>

      </Background>
    );
  }
}

const css = EStyleSheet.create({
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

export default connect(s => s)(Settings);
