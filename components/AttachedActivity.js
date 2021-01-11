import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AttachedActivity = ({ activity }) => {
  if (activity.verb === "repost") {
    return (
      <View style={styles.attachedActivity}>
        <Text style={styles.attachedActivityText}>{activity.content}</Text>
      </View>
    );
  }

  if (activity.verb === "post") {
    return (
      <View style={styles.attachedActivity}>
        <Text style={styles.attachedActivityText}>{activity.content}</Text>
      </View>
    );
  }

  if (activity.verb === "comment") {
    return (
      <View style={styles.attachedActivity}>
        <Text style={styles.attachedActivityText}>comment</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  attachedActivity: {
    paddingTop: 10,
    paddingBottom: 10
  },
  attachedActivityText: {
    fontSize: 14,
    lineHeight: 24,
    color: "#364047"
  }
});

export default AttachedActivity;
