/* eslint-disable react/display-name */
import React from "react";
import { StatusBar, Image, TouchableOpacity, View } from "react-native";

import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon
} from "expo-activity-feed";

import PostIcon from "../images/icons/post.png";
import ReplyIcon from "../images/icons/reply.png";

export const navigationOptions = ({ navigation }) => ({
  title: "HOME",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 13
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}
      style={{ paddingLeft: 15 }}
    >
      <Avatar
        source={userData => userData.data.profileImage}
        size={23}
        noShadow
      />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("NewPost")}
      style={{ paddingRight: 15 }}
    >
      <Image source={PostIcon} style={{ width: 23, height: 23 }} />
    </TouchableOpacity>
  )
})

// TODO: Convert to FC
export default class HomeScreen extends React.Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  }

  _onPressActivity = activity => {
    this.props.navigation.navigate("SinglePost", {
      activity
    });
  };

  render() {
    return (
      <FlatFeed
        feedGroup="timeline"
        options={{
          limit: 10
        }}
        notify
        navigation={this.props.navigation}
        Activity={props => (
          <TouchableOpacity
            onPress={() => this._onPressActivity(props.activity)}
          >
            <Activity
              {...props}
              Footer={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LikeButton reactionKind="heart" {...props} />

                  <ReactionIcon
                    icon={ReplyIcon}
                    labelSingle="comment"
                    labelPlural="comments"
                    counts={props.activity.reaction_counts}
                    kind="comment"
                  />
                </View>
              }
            />
          </TouchableOpacity>
        )}
      />
    );
  }
}
