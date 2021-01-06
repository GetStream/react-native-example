/* eslint-disable react/display-name */
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { BackButton } from "expo-activity-feed";
import { CommonActions } from "@react-navigation/native";

import EditProfileForm from "../components/EditProfileForm";

export const navigationOptions = ({ navigation, route }) => ({
  title: "EDIT PROFILE",
  // TODO @Jaap: Probably Text is not the correct component here, probably
  // also good to go back to the profile page after pressing save
  headerRight: () => (
    <TouchableOpacity
      style={{ paddingRight: 15 }}
      onPress={() => {
        route.params.saveFunc();
      }}
    >
      <Text>Save</Text>
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <View style={{ paddingLeft: 15 }}>
      <BackButton pressed={() => navigation.goBack()} blue />
    </View>
  ),
  headerStyle: {
    paddingLeft: 15,
    paddingRight: 15
  },
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 13
  }
})

// TODO: Convert to FC
export default class EditProfileScreen extends React.Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  }

  render() {
    return (
      <EditProfileForm
        registerSave={saveFunc => {
          this.props.navigation.dispatch(CommonActions.setParams({ saveFunc }));
        }}
      />
    );
  }
}
