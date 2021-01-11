import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AttachedActivity from "./AttachedActivity";
import { UserBar, withTranslationContext, humanizeTimestamp } from "expo-activity-feed";
import { userOrDefault } from "../utils";

import HeartIcon from "../images/icons/heart.png";
import RepostIcon from "../images/icons/repost.png";

const Notification = ({ activities, tDateTimeParser }) => {
  let headerText, headerSubtext, icon;
  const lastActivity = activities[0];
  const lastActor = userOrDefault(lastActivity.actor);
  if (activities.length === 1) {
    headerText = lastActor.data.name;
  } else if (activities.length === 2) {
    headerText = `${lastActor.data.name} and 1 other`;
  } else {
    headerText = `${lastActor.data.name} and ${activities.length - 1} others `;
  }
  if (typeof lastActivity.object === "string") {
    return null;
  }

  if (lastActivity.verb === "heart") {
    headerSubtext = "liked";
    icon = HeartIcon;
  } else if (lastActivity.verb === "repost") {
    headerSubtext = `reposted`;
    icon = RepostIcon;
  } else {
    return null;
  }

  headerSubtext += ` your ${lastActivity.object.verb}`;

  return (
    <View style={styles.item}>
      <UserBar
        username={headerText}
        avatar={lastActor.data.profileImage}
        subtitle={headerSubtext}
        icon={icon}
      />
      <View
        style={{ marginLeft: lastActivity.object.verb !== "link" ? 58 : 0 }}
      >
        <AttachedActivity activity={lastActivity.object} />
        <View style={styles.footer}>
          <Text style={styles.footerTimestamp}>
            {humanizeTimestamp(lastActivity.time, tDateTimeParser)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#DADFE3",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "column"
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerTimestamp: {
    fontSize: 13,
    color: "#535B61"
  }
});

export default withTranslationContext(Notification);
