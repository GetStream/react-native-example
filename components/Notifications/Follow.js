// @flow
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Avatar } from 'expo-activity-feed';
// $FlowFixMe https://github.com/facebook/flow/issues/345
import FollowersIcon from '../../images/icons/followers.png';

import type { NotificationActivities } from '../../types';

import { userOrDefault } from '../../utils';

type Props = {
  activities: NotificationActivities,
};

const Follow = ({ activities }: Props) => {
  return (
    <View style={styles.item}>
      {activities.length !== 1 ? (
        <Image style={styles.icon} source={FollowersIcon} />
      ) : (
        <TouchableOpacity>
          <Avatar
            source={userOrDefault(activities[0].actor).data.profileImage}
            size={48}
            noShadow
          />
        </TouchableOpacity>
      )}

      <View style={{ flex: 1, paddingLeft: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          {activities.length > 1
            ? activities.map((activity) => {
                return (
                  <TouchableOpacity style={styles.follow} key={activity.id}>
                    <Avatar
                      source={userOrDefault(activity.actor).data.profileImage}
                      size={29}
                      noShadow
                    />
                  </TouchableOpacity>
                );
              })
            : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.footerTextBold}>
              @{userOrDefault(activities[0].actor).data.name}
            </Text>
            {activities.length > 1
              ? ' and ' + (activities.length - 1) + ' others'
              : null}{' '}
            followed you
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
    flexDirection: 'row',
  },
  icon: {
    width: 48,
    height: 48,
  },
  follow: {
    marginRight: 5,
  },
  object: {},
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 13,
    color: '#535B61',
  },
  footerTextBold: {
    fontSize: 13,
    fontWeight: '600',
    color: '#535B61',
  },
  objectFooterTimestamp: {
    fontSize: 13,
    color: '#535B61',
  },
});

export default Follow;
