import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const GroupCard = ({ item }) => {
  const { image, icon, name } = item;
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require('../images/placeholder.png')}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <Image
        source={
          icon ? { uri: icon } : require('../images/icons/icon_placeholder.png')
        }
        style={styles.icon}
      />
      <Text style={styles.name}>{name ? name : 'Name'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    borderRadius: 6,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  background: {
    width: 110,
    height: 110,
    position: 'absolute',
  },
  overlay: {
    width: 110,
    height: 110,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
  },
  name: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 7,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default GroupCard;
