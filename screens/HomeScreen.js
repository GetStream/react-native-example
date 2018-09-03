// @flow
import React from 'react';
import { StatusBar, Image, TouchableOpacity, View } from 'react-native';

import {
  Avatar,
  FlatFeed,
  Activity,
  LikeButton,
  ReactionIcon,
} from 'expo-activity-feed';
import type { UserResponse } from '../types';

// $FlowFixMe https://github.com/facebook/flow/issues/345
import PostIcon from '../images/icons/post.png';

import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation?: NavigationScreen,
|};

class HomeScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;
  static navigationOptions = ({ navigation }: Props) => ({
    title: 'HOME',
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ paddingLeft: 15 }}
      >
        <Avatar
          source={(userData: UserResponse) => userData.data.profileImage}
          size={23}
          noShadow
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('NewPost')}
        style={{ paddingRight: 15 }}
      >
        <Image source={PostIcon} style={{ width: 23, height: 23 }} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  _onPressActivity = (activity) => {
    this.props.navigation.navigate('SinglePost', {
      activity: activity,
    });
  };

  render() {
    return (
      <FlatFeed
        feedGroup="timeline"
        options={{
          limit: 10,
        }}
        notify
        navigation={this.props.navigation}
        renderActivity={(props) => (
          <TouchableOpacity
            onPress={() => this._onPressActivity(props.activity)}
          >
            <Activity
              {...props}
              Footer={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <LikeButton {...props} />

                  <ReactionIcon
                    icon={require('../images/icons/reply.png')}
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

export default HomeScreen;
