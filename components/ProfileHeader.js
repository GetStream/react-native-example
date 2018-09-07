// @flow

import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { StreamApp } from 'expo-activity-feed';
import Count from './Count';
import { Avatar } from 'expo-activity-feed';
import CoverImage from './CoverImage';
import type { FollowCounts } from 'getstream';
import type { AppCtx } from 'expo-activity-feed';
import type { UserData } from '../types';

type Props = {};

export default class ProfileHeader extends React.Component<Props> {
  render() {
    return (
      <StreamApp.Consumer>
      {(appCtx) => <ProfileHeaderInner {...this.props} {...appCtx} />}
      </StreamApp.Consumer>
    );
  }
}

type PropsInner = Props & AppCtx<UserData>;

type State = {
  user: FollowCounts,
};

class ProfileHeaderInner extends React.Component<PropsInner, State> {
  constructor(props: PropsInner) {
    super(props);
    this.state = {
      user: {
        following_count: 0,
        followers_count: 0,
      },
    };
  }

  async componentDidMount() {
    let data = await this.props.user.profile();
    this.props.changedUserData();
    this.setState({ user: data });
  }

  render() {
    let { following_count, followers_count } = this.state.user;
    let { name, url, desc, profileImage, coverImage } =
      this.props.userData || {};

    coverImage ? StatusBar.setBarStyle('light-content', true) : null;

    return (
      <SafeAreaView style={[styles.profileHeader]}>
        {coverImage ? <CoverImage source={coverImage} /> : null}

        <View style={[styles.mainSection]}>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userUrl}>{url}</Text>
            <Text style={styles.userDesc}>{desc}</Text>
          </View>
          <Avatar source={profileImage} size={150} />
        </View>

        <View style={styles.statSection}>
          <Count num={following_count}>Followers</Count>
          <Count num={followers_count}>Following</Count>
        </View>
      </SafeAreaView>
    );
  }
}

const margin = 15;

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: '#fff',
    paddingBottom: margin,
    width: 100 + '%',
  },
  profileHeaderShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  mainSection: {
    width: 100 + '%',
    height: 150,
    marginTop: 90,
    marginBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 39,
    fontWeight: '600',
    color: '#364047',
  },
  userUrl: {
    fontSize: 12,
    color: '#364047',
  },
  userDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#364047',
    lineHeight: 19,
    marginTop: 7,
  },
  statSection: {
    paddingLeft: margin * 2,
    paddingRight: margin,
    flexDirection: 'row',
  },
});
