import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { UserBar, Card } from 'expo-activity-feed';

const Repost = ({ item }) => {
  return (
    <View style={styles.item}>
      <UserBar
        username="Wonderwoman"
        subtitle={'reposted your ' + item.object.type}
      />

      {item.object.type === 'link' ? (
        <Card
          item={{
            title: item.object.title,
            description: item.object.description,
          }}
        />
      ) : null}

      {item.object.type === 'post' ? (
        <View style={{ marginLeft: 58, marginTop: 15 }}>
          <Text>post</Text>
        </View>
      ) : null}

      {item.object.type === 'comment' ? (
        <View style={{ marginLeft: 58, marginTop: 15 }}>
          <Text>comment</Text>
        </View>
      ) : null}
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
  },
});

export default Repost;
