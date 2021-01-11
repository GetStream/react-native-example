/* eslint-disable react/display-name */
import React from "react";
import { Image, TouchableOpacity, StatusBar, View } from "react-native";
import Notification from "../components/Notification";
import Follow from "../components/Notifications/Follow";
import { NotificationFeed } from "expo-activity-feed";

import ReplyIcon from "../images/icons/reply.png";
import CategoriesIcon from "../images/icons/categories.png";
import PostIcon from "../images/icons/post.png";

import { Activity, LikeButton, ReactionIcon } from "expo-activity-feed";

export const navigationOptions = ({ navigation }) => ({
  title: "NOTIFICATIONS",
  headerLeft: () => (
    <View style={{ paddingLeft: 15 }}>
      <Image source={CategoriesIcon} style={{ width: 23, height: 23 }} />
    </View>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("NewPost")}
      style={{ paddingRight: 15 }}
    >
      <Image source={PostIcon} style={{ width: 23, height: 23 }} />
    </TouchableOpacity>
  ),
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 13
  }
});

// TODO: Convert to FC
export default class NotificationScreen extends React.Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  }
  componentDidUpdate() {}

  _renderGroup = ({ activityGroup, styles, ...props }: any) => {
    const verb = activityGroup.activities[0].verb;
    if (verb === "follow") {
      return <Follow activities={activityGroup.activities} styles={styles} />;
    } else if (verb === "heart" || verb === "repost") {
      return (
        <Notification activities={activityGroup.activities} styles={styles} />
      );
    } else {
      const activity = activityGroup.activities[0];
      return (
        <Activity
          activity={activity}
          {...props}
          Footer={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LikeButton reactionKind="heart" activity={activity} {...props} />

              <ReactionIcon
                icon={ReplyIcon}
                labelSingle="comment"
                labelPlural="comments"
                counts={activityGroup.activities.reaction_counts}
                kind="comment"
              />
            </View>
          }
        />
      );
    }
  };

  render() {
    return (
      <NotificationFeed
        Group={this._renderGroup}
        navigation={this.props.navigation}
        notify
      />
    );
  }
}
