// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AttachedActivity from './AttachedActivity';
import { UserBar, humanizeTimestamp } from 'expo-activity-feed';
import { userOrDefault } from '../utils';

// $FlowFixMe https://github.com/facebook/flow/issues/345
import HeartIcon from '../images/icons/heart.png';
// $FlowFixMe https://github.com/facebook/flow/issues/345
import RepostIcon from '../images/icons/repost.png';

import type { NotificationActivities } from '../types';

type Props = {
  activities: NotificationActivities,
};

const Notification = ({ activities }: Props) => {
  let headerText, headerSubtext, icon;
  let lastActivity = activities[0];
  let lastActor = userOrDefault(lastActivity.actor);
  if (activities.length == 1) {
    headerText = lastActor.data.name;
  } else if (activities.length == 2) {
    headerText = `${lastActor.data.name} and 1 other`;
  } else {
    headerText = `${lastActor.data.name} and ${activities.length - 1} others `;
  }
  if (typeof lastActivity.object === 'string') {
    return null;
  }

  if (lastActivity.verb === 'heart') {
    headerSubtext = 'liked';
    icon = HeartIcon;
  } else if (lastActivity.verb === 'repost') {
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
        style={{ marginLeft: lastActivity.object.verb !== 'link' ? 58 : 0 }}
      >
        <AttachedActivity activity={lastActivity.object} />
        <View style={styles.footer}>
          <Text style={styles.footerTimestamp}>
            {humanizeTimestamp(lastActivity.time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#DADFE3',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'column',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTimestamp: {
    fontSize: 13,
    color: '#535B61',
  },
});

export default Notification;
