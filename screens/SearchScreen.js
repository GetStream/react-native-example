import React from 'react';
import { View, StatusBar, Image, ScrollView, FlatList } from 'react-native';

import LargeHeading from '../components/LargeHeading';
import HorizontalScrollFeed from '../components/HorizontalScrollFeed';
import { Avatar, UserCard } from 'expo-activity-feed';
import GroupCard from '../components/GroupCard';
import SearchBox from '../components/SearchBox';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interestingUsers: [
        {
          id: 1235,
          user_image: 'https://randomuser.me/api/portraits/women/65.jpg',
        },
        {
          id: 2345,
          user_image: 'https://randomuser.me/api/portraits/men/24.jpg',
        },
        {
          id: 3456,
          user_image: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
        {
          id: 4567,
          user_image: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
          id: 6789,
          user_image: 'https://randomuser.me/api/portraits/women/23.jpg',
        },
        {
          id: 7890,
          user_image: 'https://randomuser.me/api/portraits/men/67.jpg',
        },
        {
          id: 2456,
          user_image: 'https://randomuser.me/api/portraits/women/12.jpg',
        },
      ],
      trendingGroups: [
        {
          id: 1234,
          name: 'Beer',
          image:
            'https://cdn.britannica.com/700x450/72/186972-049-26ACDCBE.jpg',
          icon: '',
        },
        {
          id: 2345,
          name: 'Arcade',
          image: 'http://www.thebasementarcade.com/gameroom/0516/1.jpg',
          icon: '',
        },
        {
          id: 3456,
          name: 'Nature',
          image:
            'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
          icon: '',
        },
        { id: 4567, image: '', icon: '' },
        { id: 6789, image: '', icon: '' },
        { id: 7890, image: '', icon: '' },
        { id: 8909, image: '', icon: '' },
      ],
      users: [
        {
          id: 1235,
          name: 'Danny',
          user_image: 'https://randomuser.me/api/portraits/women/65.jpg',
          followed: false,
        },
        {
          id: 2345,
          name: 'James',
          user_image: 'https://randomuser.me/api/portraits/men/24.jpg',
          followed: true,
        },
        {
          id: 3456,
          name: 'Jennifer',
          user_image: 'https://randomuser.me/api/portraits/women/45.jpg',
          followed: false,
        },
        {
          id: 4567,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/men/45.jpg',
          followed: false,
        },
        {
          id: 6789,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/women/23.jpg',
          followed: false,
        },
        {
          id: 7890,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/men/67.jpg',
          followed: false,
        },
        {
          id: 2456,
          name: 'hello world',
          user_image: 'https://randomuser.me/api/portraits/women/12.jpg',
          followed: false,
        },
      ],
    };
  }

  static navigationOptions = () => ({
    title: 'DISCOVER',
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <Image
          source={require('../images/icons/categories.png')}
          style={{ width: 23, height: 23 }}
        />
      </View>
    ),
    headerRight: (
      <View style={{ paddingRight: 15 }}>
        <Image
          source={require('../images/icons/post.png')}
          style={{ width: 23, height: 23 }}
        />
      </View>
    ),
  });

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBox />

        <LargeHeading>Trending Groups</LargeHeading>
        <HorizontalScrollFeed
          data={this.state.trendingGroups}
          renderItem={({ item }) => (
            <View style={{ marginRight: 6 }}>
              <GroupCard item={item} />
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />

        <LargeHeading>Interesting Users</LargeHeading>
        <HorizontalScrollFeed
          data={this.state.interestingUsers}
          renderItem={({ item }) => (
            <View style={{ marginRight: 6 }}>
              <Avatar size={60} noShadow source={item.user_image} />
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />

        <LargeHeading>People you may know</LargeHeading>
        <FlatList
          style={{ marginTop: 15 }}
          data={this.state.users}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
              <UserCard
                username={'UserName'}
                subtitle={'@subtitle'}
                user={item}
                follow
              />
            </View>
          )}
          keyExtractor={(item) => `item-${item.id}`}
        />
      </ScrollView>
    );
  }
}

export default SearchScreen;
