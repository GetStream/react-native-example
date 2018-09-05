//@flow
import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Icon from './components/Icon';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SinglePostScreen from './screens/SinglePostScreen';
import StatusUpdateScreen from './screens/StatusUpdateScreen';

import {
  Avatar,
  StreamApp,
  FlatFeed,
  Activity,
  StatusUpdateForm,
  LikeButton,
  IconBadge,
} from 'expo-activity-feed';
import type { UserResponse } from './types';

// $FlowFixMe
const NotificationsStack = createStackNavigator({
  Notifications: { screen: NotificationsScreen },
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
});

const SearchStack = createStackNavigator({
  Search: { screen: SearchScreen },
});

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Notifications: NotificationsStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return <Icon name="home" />;
        } else if (routeName === 'Search') {
          return <Icon name="search" />;
        } else if (routeName === 'Notifications') {
          return (
            <IconBadge showNumber>
              <Icon name="notifications" />
            </IconBadge>
          );
        } else if (routeName === 'Profile') {
          return (
            // TODO: Link this to the current user
            <Avatar
              source={(userData: UserResponse) => userData.data.profileImage}
              size={25}
              noShadow
            />
          );
        }
      },
    }),
    initialRouteName: 'Home',
  },
);

const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};

const Navigation = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    ...doNotShowHeaderOption,
  },
  SinglePost: { screen: SinglePostScreen },
  NewPost: { screen: StatusUpdateScreen },
  EditProfile: { screen: EditProfileScreen },
});

const App = () => {
  let apiKey = process.env['STREAM_API_KEY'];
  let appId = process.env['STREAM_APP_ID'];
  let token = process.env['STREAM_TOKEN'];

  if (!apiKey) {
    console.error('STREAM_API_KEY should be set');
    return null;
  }

  if (!appId) {
    console.error('STREAM_APP_ID should be set');
    return null;
  }

  if (!token) {
    console.error('STREAM_TOKEN should be set');
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  function example() {
    return (
      <StreamApp
        apiKey={apiKey}
        appId={appId}
        token={token}
        defaultUserData={{
          name: 'Batman',
          url: 'batsignal.com',
          desc: 'Smart, violent and brutally tough solutions to crime.',
          profileImage:
            'https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg',
          coverImage:
            'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1',
        }}
      >
        <Navigation />
      </StreamApp>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function stepOne() {
    return <StreamApp apiKey={apiKey} appId={appId} token={token} />;
  }

  // eslint-disable-next-line no-unused-vars
  function stepTwo() {
    return (
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <FlatFeed />
      </StreamApp>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function stepThree() {
    const renderActivity = (props) => {
      return <Activity {...props} Footer={<LikeButton {...props} />} />;
    };

    return (
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <FlatFeed renderActivity={renderActivity} />
      </StreamApp>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function stepFour() {
    const renderActivity = (props) => {
      return <Activity {...props} Footer={<LikeButton {...props} />} />;
    };

    return (
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <FlatFeed renderActivity={renderActivity} />
        <StatusUpdateForm />
      </StreamApp>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function stepFive() {
    const renderActivity = (props) => {
      return <Activity {...props} Footer={<LikeButton {...props} />} />;
    };

    return (
      <StreamApp apiKey={apiKey} appId={appId} token={token}>
        <FlatFeed renderActivity={renderActivity} notify />
        <StatusUpdateForm feedGroup="timeline" />
      </StreamApp>
    );
  }

  // eslint-disable-next-line no-unused-vars
  // return example();
  // return stepOne();
  // return stepTwo();
  // return stepThree();
  // return stepFour();
  return stepFive();
};

export default App;
