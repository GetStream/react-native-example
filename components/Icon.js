import React from 'react';
import { Image } from 'react-native';

const Icon = ({ name }) => {
  if (name === 'home') {
    return (
      <Image
        source={require('../images/icons/home.png')}
        style={{ width: 25, height: 25 }}
      />
    );
  } else if (name === 'notifications') {
    return (
      <Image
        source={require('../images/icons/notifications.png')}
        style={{ width: 25, height: 25 }}
      />
    );
  } else if (name === 'search') {
    return (
      <Image
        source={require('../images/icons/search.png')}
        style={{ width: 25, height: 25 }}
      />
    );
  }
};

export default Icon;
