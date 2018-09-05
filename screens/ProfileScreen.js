// @flow

import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import Button from '../components/Button';
import { FlatFeed } from 'expo-activity-feed';
import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation: NavigationScreen,
|};

export default class ProfileScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      paddingLeft: 10,
      paddingRight: 10,
    },
    headerRight: (
      <Button pressed={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Button>
    ),
    headerTransparent: true,
    headerBackTitle: null,
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ProfileHeader />
        <FlatFeed feedGroup="user" />
      </ScrollView>
    );
  }
}
