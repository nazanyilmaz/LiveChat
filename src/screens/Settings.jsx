//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Subheading, Title} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

// create a component
const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setName(user?.displayName ?? '');
      setEmail(user?.email) ?? '';
      user?.displayName;
      user?.email;
    });
  }, []);
  return (
    <View style={{alignItems: 'center', marginTop: 16}}>
      <Avatar.Text
        label={name.split(' ').reduce((prev, current) => prev + current[0], '')}
      />
      <Title style={{fontWeight: 'bold'}}>{name}</Title>
      <Subheading>{email}</Subheading>
      <Button
        onPress={() => auth().signOut()}
        mode="outlined"
        style={{borderColor: '#6314c9', marginTop: 15}}>
        Sign Out
      </Button>
    </View>
  );
};

//make this component available to the app
export default Settings;
