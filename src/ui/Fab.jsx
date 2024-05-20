//import liraries
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Add} from 'iconsax-react-native';

// create a component
const Fab = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Add size="50" color="white" font={'bolder'} />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 1000,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 0.5,
    height: 0.5,
  },
});

//make this component available to the app
export default Fab;
