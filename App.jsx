import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-native-paper';
import ChatList from './src/screens/ChatList';
import Settings from './src/screens/Settings';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Chat from './src/screens/Chat';
import {Messages2, Setting2} from 'iconsax-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Tabs = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();

const TabScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('SignUp');
      }
    });
  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'ChatList') {
            return (icon = focused ? (
              <Messages2 size="28" color="#6750a4" variant="Bold" />
            ) : (
              <Messages2 size="28" color="#6750a4" variant="Outline" />
            ));
          } else if (route.name === 'Settings') {
            return (icon = focused ? (
              <Setting2 size="28" color="#6750a4" variant="Bold" />
            ) : (
              <Setting2 size="28" color="#6750a4" variant="Outline" />
            ));
          }
        },
        tabBarActiveTintColor: '#6750a4',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const ChatsScreen = () => {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen name="ChatList" component={ChatList} />
      <ChatsStack.Screen name="Chat" component={Chat} />
    </ChatsStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

const SettingsScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <MainStack.Navigator>
          <MainStack.Screen
            options={{headerShown: false}}
            name="Back"
            component={TabScreen}
          />
          <MainStack.Screen name="Chat" component={Chat} />
          <MainStack.Screen
            name="SignUp"
            component={SignUp}
            options={{presentation: 'fullScreenModal'}}
          />
          <MainStack.Screen
            name="SignIn"
            component={SignIn}
            options={{presentation: 'fullScreenModal'}}
          />
        </MainStack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
