//@flow
import React from 'react';
import { StatusBar, Image, View } from 'react-native';

import Notification from '../components/Notification';
import Follow from '../components/Notifications/Follow';
import { NotificationFeed } from 'expo-activity-feed';
// $FlowFixMe https://github.com/facebook/flow/issues/345
import CategoriesIcon from '../images/icons/categories.png';
// $FlowFixMe https://github.com/facebook/flow/issues/345
import PostIcon from '../images/icons/post.png';

import { Activity, LikeButton, ReactionIcon } from 'expo-activity-feed';

import type { NavigationScreen } from 'expo-activity-feed';
import type { NavigationEventSubscription } from 'react-navigation';

type Props = {|
  navigation?: NavigationScreen,
|};

export default class NotificationScreen extends React.Component<Props> {
  _navListener: NavigationEventSubscription;

  static navigationOptions = () => ({
    title: 'NOTIFICATIONS',
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <Image source={CategoriesIcon} style={{ width: 23, height: 23 }} />
      </View>
    ),
    headerRight: (
      <View style={{ paddingRight: 15 }}>
        <Image source={PostIcon} style={{ width: 23, height: 23 }} />
      </View>
    ),
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }
  componentDidUpdate() {}

  _renderGroup = ({ activityGroup, styles, ...props }: any) => {
    let verb = activityGroup.activities[0].verb;
    if (verb === 'follow') {
      return <Follow activities={activityGroup.activities} styles={styles} />;
    } else if (verb === 'heart' || verb === 'repost') {
      return (
        <Notification activities={activityGroup.activities} styles={styles} />
      );
    } else {
      let activity = activityGroup.activities[0];
      return (
        <Activity
          activity={activity}
          {...props}
          Footer={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LikeButton activity={activity} {...props} />

              <ReactionIcon
                icon={require('../images/icons/reply.png')}
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
        renderGroup={this._renderGroup}
        navigation={this.props.navigation}
        notify
      />
    );
  }
}
