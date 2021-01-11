// 
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Avatar, humanizeTimestamp } from "expo-activity-feed";

import HeartIconOutline from "../images/icons/heart-outline.png";
import RepostIcon from "../images/icons/repost.png";

// TODO: Convert to FC
export default class RepostItem extends React.Component {
  _onPressLike = () => {
    if (this.props.onPressLike) {
      this.props.onPressLike(this.props.repost.id);
    }
  };

  render() {
    const { repost } = this.props;
    return (
      <View style={styles.repostItem}>
        <View style={styles.repostAvatar}>
          <Avatar source={repost.user.data.profileImage} size={25} noShadow />
        </View>
        <Image source={RepostIcon} style={styles.repostIcon} />
        <View style={styles.repostText}>
          <Text>
            <Text style={styles.repostAuthor}>{repost.user.data.name} </Text>
            <Text style={styles.repostContent}>{repost.data.text} </Text>
            <Text style={styles.repostTime}>
              {humanizeTimestamp(repost.created_at)}
            </Text>
          </Text>
        </View>
        <View style={styles.repostActions}>
          <TouchableOpacity onPress={this._onPressLike}>
            <Image source={HeartIconOutline} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repostItem: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 12,
    paddingTop: 12,
    alignItems: "center",
    borderBottomColor: "#DADFE3",
    borderBottomWidth: 1
  },
  repostAvatar: {
    marginRight: 5
  },
  repostIcon: {
    width: 20,
    height: 20
  },
  heartIcon: { width: 24, height: 24 },
  repostText: {
    flex: 1,
    marginLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  repostAuthor: {
    fontWeight: "700",
    fontSize: 14
  },
  repostContent: {
    fontSize: 14
  },
  repostTime: {
    fontSize: 14,
    color: "#95A4AD"
  },
  repostActions: {
    flexDirection: "row",
    marginLeft: 5
  }
});
