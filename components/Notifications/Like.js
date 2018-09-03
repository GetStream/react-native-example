import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Avatar from '../../Avatar';
import AttachedObject from '../../AttachedObject';

const Like = ({ item }) => {
  let headerText;
  if (Array.isArray(item.actors)) {
    headerText = `${item.actors[0].user_name} and ${item.actors.length -
      1} others `;
  } else {
    headerText = item.actors[0].user_name;
  }
  return (
    <View style={styles.item}>
      <Avatar source={item.actors[0].user_image} size={48} noShadow />
      <View style={{ flex: 1, paddingLeft: 15 }}>
        <Text style={styles.itemHeader}>{headerText}</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require('../../../images/icons/heart.png')}
          />
          <Text style={styles.itemSubheader}>
            liked your {item.object.type}
          </Text>
        </View>

        <AttachedObject item={item.object} />
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
  itemHeader: {
    fontSize: 17,
    color: '#000',
    opacity: 0.9,
    lineHeight: 24,
  },
  itemSubheader: {
    fontSize: 17,
    lineHeight: 24,
    opacity: 0.7,
  },
});

export default Like;
