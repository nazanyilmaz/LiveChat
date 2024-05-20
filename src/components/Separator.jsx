//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const Separator = () => {
  return <View style={styles.separator}></View>;
};

// define your styles
const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E2E2',
    marginStart: 88,
  },
});

//make this component available to the app
export default Separator;
