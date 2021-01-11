import React from "react";
import { View, Text, StyleSheet } from "react-native";
import numeral from "numeral";

const Count = ({ num, children }) => (
  <View style={styles.count}>
    <Text style={styles.num}>
      {numeral(num)
        .format("0a")
        .toUpperCase()}
    </Text>
    <Text style={styles.name}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  count: {
    marginRight: 72
  },
  num: {
    color: "#364047",
    fontSize: 24,
    fontWeight: "500"
  },
  name: {
    fontSize: 11
  }
});

export default Count;
