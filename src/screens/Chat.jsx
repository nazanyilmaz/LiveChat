//import liraries
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [uid, setUID] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      setUID(user?.uid);
      setName(user?.displayName);
      user.uid;
      user.displayName;
    });
  }, []);

  useEffect(() => {
    return firestore()
      .doc('chats/' + route.params.chatId)
      .onSnapshot(snapshot => {
        setMessages(snapshot.data()?.messages ?? []);
      });
  }, [route.params.chatId]);

  const onSend = (m = []) => {
    firestore()
      .doc('chats/' + route.params.chatId)
      .set(
        {
          messages: GiftedChat.append(messages, m),
        },
        {merge: true},
      );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1 / 1.1}}>
      <GiftedChat
        messages={messages.map(x => ({
          ...x,
          createdAt: x.createdAt?.toDate(),
        }))}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid,
          name: name,
        }}
      />
    </View>
  );
};

export default Chat;
