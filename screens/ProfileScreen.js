/* eslint-disable react/display-name */

import React from "react";
import { ScrollView, StatusBar } from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import { FlatFeed } from "expo-activity-feed";
import Button from "../components/Button";

export const navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
  },
  headerRight: () => (
    <Button pressed={() => navigation.navigate("EditProfile")} style={{ marginRight: 10 }}>
      Edit Profile
    </Button>
  ),
  headerTransparent: true,
  headerBackTitle: null
})

// TODO: Convert to FC
export default class ProfileScreen extends React.Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ProfileHeader />
        <FlatFeed feedGroup="user" />
      </ScrollView>
    );
  }
}
