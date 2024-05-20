//import liraries
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {Button, TextInput, Subheading} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const createAccount = async () => {
    //console.warn('hiiii');
    setIsLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await response.user.updateProfile({displayName: name});
      navigation.popToTop();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      //Alert.alert(e.message);
    }
  };

  return (
    <View style={{margin: 18}}>
      {!!error && (
        <Subheading
          style={{color: 'tomato', textAlign: 'center', marginBottom: 16}}>
          {error}
        </Subheading>
      )}
      <TextInput
        style={{backgroundColor: '#c8bee2'}}
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Email"
        style={{marginTop: 12, backgroundColor: '#c8bee2'}}
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        secureTextEntry
        label="Password"
        style={{marginTop: 12, backgroundColor: '#c8bee2'}}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <Button
          mode="outlined"
          style={{borderColor: '#6314c9', width: 100}}
          compact
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Button>
        <Button
          mode="contained"
          style={{borderColor: '#6314c9'}}
          onPress={() => createAccount()}
          loading={isLoading}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

//make this component available to the app
export default SignUp;
