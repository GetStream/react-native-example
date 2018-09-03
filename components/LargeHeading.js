import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LargeHeading = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    color: '#535B61',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default LargeHeading;
