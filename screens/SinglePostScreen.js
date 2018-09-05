// @flow
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import {
  SinglePost,
  CommentBox,
  BackButton,
  Activity,
  LikeButton,
  ReactionIcon,
  CommentList,
  LikesList,
} from 'expo-activity-feed';

import RepostList from '../components/RepostList';

import type { UserResponse } from '../types';
import type { NavigationScreen } from 'expo-activity-feed';

import ReplyIcon from '../images/icons/reply.png';

type Props = {|
  navigation: NavigationScreen,
|};

export default class SinglePostScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: 'POST DETAIL',
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <BackButton pressed={() => navigation.goBack()} blue />
      </View>
    ),
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
  });

  render() {
    const { navigation } = this.props;
    const activity = navigation.getParam('activity');
    const feedGroup = navigation.getParam('feedGroup');
    const userId = navigation.getParam('userId');
    return (
      <SafeAreaView style={styles.container}>
        <SinglePost
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
          navigation={this.props.navigation}
          renderActivity={(props) => (
            <React.Fragment>
              <Activity
                {...props}
                Footer={
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LikeButton {...props} />

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
              <CommentList reactions={props.activity.latest_reactions} />
              <RepostList reactions={props.activity.latest_reactions} />

              <View style={styles.sectionHeader} />
              <View style={styles.likesContainer}>
                <LikesList
                  reactions={props.activity.latest_reactions}
                  reactionKind="heart"
                />
              </View>
            </React.Fragment>
          )}
          Footer={(props) => {
            return (
              <CommentBox
                onSubmit={(text) =>
                  props.onAddReaction('comment', activity, {
                    data: { text: text },
                  })
                }
                avatarProps={{
                  source: (userData: UserResponse) =>
                    userData.data.profileImage,
                }}
                styles={{ container: { height: 78 } }}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
