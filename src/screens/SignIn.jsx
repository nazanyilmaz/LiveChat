import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, TextInput, Subheading} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const signIn = async () => {
    //console.warn('hiiii');
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={{marginHorizontal: 26, marginVertical: 50}}>
      {!!error && (
        <Subheading
          style={{color: 'tomato', textAlign: 'center', marginBottom: 16}}>
          {error}
        </Subheading>
      )}

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
        style={{marginTop: 16, backgroundColor: '#c8bee2'}}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Button
          compact
          onPress={() => navigation.navigate('SignUp')}
          mode="outlined"
          style={{borderColor: '#6314c9', width: 90}}>
          Sign Up
        </Button>
        <Button
          mode="contained"
          style={{borderColor: '#6314c9'}}
          onPress={() => signIn()}
          loading={isLoading}>
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default SignIn;
