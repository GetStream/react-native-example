/* eslint-disable react/display-name */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-view";

import { STREAM_API_KEY, STREAM_API_TOKEN, STREAM_APP_ID } from "@env";

import EditProfileScreen, { navigationOptions as editProfileNavigationOptions } from "./screens/EditProfileScreen";
import SinglePostScreen, { navigationOptions as singlePostNavigationOptions } from "./screens/SinglePostScreen";
import StatusUpdateScreen, { navigationOptions as statusUpdateNavigationOptions } from "./screens/StatusUpdateScreen";

import { StreamApp } from "expo-activity-feed";
import { BottomTabNavigator } from "./components/BottomTabNavigator";

const Stack = createStackNavigator();

const App = () => {
  const apiKey = STREAM_API_KEY;
  const appId = STREAM_APP_ID;
  const token = STREAM_API_TOKEN;

  // IMPORTANT: This token is should normally be generated server side, so the
  // client doesn't have access to the master secret.

  return (
    <SafeAreaProvider>
      <StreamApp
        apiKey={apiKey}
        appId={appId}
        token={token}
        defaultUserData={{
          name: "Batman",
          url: "batsignal.com",
          desc: "Smart, violent and brutally tough solutions to crime.",
          profileImage:
            "https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg",
          coverImage:
            "https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1"
        }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName={BottomTabNavigator}>
            <Stack.Screen
              component={BottomTabNavigator}
              name="BottomTabNavigator"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={SinglePostScreen}
              name="SinglePost"
              options={singlePostNavigationOptions}
            />
            <Stack.Screen
              component={StatusUpdateScreen}
              name="NewPost"
              options={statusUpdateNavigationOptions}
            />
            <Stack.Screen
              component={EditProfileScreen}
              name="EditProfile"
              options={editProfileNavigationOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StreamApp>
    </SafeAreaProvider>
  );
};

export default App;
