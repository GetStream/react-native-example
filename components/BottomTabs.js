/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, IconBadge } from "expo-activity-feed";

import Icon from "./Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const BottomTabs = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const { bottom } = useSafeAreaInsets();
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  
    const getTab = routeName => {
      switch (routeName) {
        case "Notifications":
          return (
            <IconBadge showNumber>
              <Icon name="notifications" />
            </IconBadge>
          );
        case "Profile":
          return (
            // TODO: Link this to the current user
            <Avatar
              source={userData => userData.data.profileImage}
              size={25}
              noShadow
            />
          );
        case "Search":
          return <Icon name="search" />;
        case "Home":
          return <Icon name="home" />;
        default:
          return null;
      }
    };
  
    return (
      <View style={[styles.container, { paddingBottom: bottom }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };
  
          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabContainer}
            >
              {getTab(label)}
              <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderTopColor: "#bbbbbb",
      borderTopWidth: 1,
      paddingVertical: 10,
      backgroundColor: "white"
    },
    tabContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });
  