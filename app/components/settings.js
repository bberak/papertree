import React, { Component } from "react";
import { View, Text, Image, ScrollView, RefreshControl, Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Background from "./background";
import Button from "./button";
import Label from "./label";
import Link from "./link";
import api  from '../utils/papertrailApi'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searches: [],
      selectedSearch: null
    };
  }

  componentDidMount = () => {
    this.onRefresh();
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true
    })
    try {
      this.setState({
        searches: await api.listSearches(),
        refreshing: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        refreshing: false
      })
    }
  };

  linkPressed = (s) => {
    if (s.id === (this.state.selectedSearch || {}).id) {
      this.setState({
        selectedSearch: null
      });
    } else {
      this.setState({
        selectedSearch: s
      });
    }
  }

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

    let searchItems = this.state.searches &&
      this.state.searches.length > 0
      ? this.state.searches.map(x => {
          let selected = x.id === (this.state.selectedSearch || {}).id;
          let color = EStyleSheet.value(selected ? "$secondaryColor" : "$linkFontColor");
          return <Link key={x.id} value={x.name} color={color} onPress={() => this.linkPressed(x)} />;
        })
      : <Link value={"* * *"} disabled={true} />;

    return (
      <Background>

        <Image style={css.logo} source={require("../images/logo-small.png")} />

        <ScrollView
          refreshControl={refreshControl}
          contentContainerStyle={css.scrollViewContent}
        >

          <Label value={"Saved Searches"} />
          <View style={css.listContainer}>
            {searchItems}
          </View>

          <Label value={"Support"} />
          <Link value={"papertree.io"} onPress={() => Linking.openURL("https://papertree.io")} />
          <Link value={"papertrailapp.com"} onPress={() => Linking.openURL("https://papertrailapp.com")} />

        </ScrollView>

        <View style={css.buttonContainer}>
          <Button disabled={false} value={"Logout"} onPress={api.logout} />
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
  scrollViewContent: {
    flex: 1,
    alignItems: "center"
  },
  listContainer: {
    marginBottom: "5%",
  },
  buttonContainer: {
    marginHorizontal: "7%",
    marginBottom: "2%"
  }
});

export default Settings;
