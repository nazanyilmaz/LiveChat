//import liraries
import {ArrowRight2} from 'iconsax-react-native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// create a component
const ContactRow = ({name, subtitle, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>
          {name
            .split(' ')
            .reduce((prev, current) => `${prev}${current[0]}`, '')}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text>{name}</Text>
        <Text>{subtitle}</Text>
      </View>
      <ArrowRight2 size="20" color="#697689" variant="Outline" />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginStart: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ff8a65',
  },
  avatarLabel: {
    fontSize: 20,
    color: 'white',
  },
  name: {
    fontSize: 16,
  },
  subtitle: {
    marginTop: 2,
    color: '#565656',
  },
});

//make this component available to the app
export default ContactRow;
