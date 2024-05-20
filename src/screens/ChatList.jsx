//import liraries
import {AddCircle} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {
  List,
  Avatar,
  Divider,
  Portal,
  Dialog,
  Button,
  TextInput,
} from 'react-native-paper';

// create a component
const ChatList = () => {
  const navigation = useNavigation();
  const [isDialogViisble, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setEmail(user?.email ?? '');
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const createChat = async () => {
    if (!email || !userEmail) return;
    setIsLoading(true);

    const response = await firestore()
      .collection('chats')
      .add({
        users: [email, userEmail],
      });
    setIsLoading(false);
    setIsDialogVisible(false);
    navigation.navigate('Chat', {chatId: response.id});
  };
  const [chats, setChats] = useState([]);
  useEffect(() => {
    return firestore()
      .collection('chats')
      .where('users', 'array-contains', email)
      .onSnapshot(querySnapshot => {
        setChats(querySnapshot.docs);
      });
  }, [email]);

  return (
    <View style={{flex: 1}}>
      {chats.map(chat => (
        <>
          <List.Item
            onPress={() => navigation.navigate('Chat', {chatId: chat.id})}
            title={chat.data().users.find(x => x !== email)}
            description={(chat.data().messages ?? [])[0]?.text ?? undefined}
            left={() => (
              <Avatar.Text
                label={chat
                  .data()
                  .users.find(x => x !== email)
                  .split('')
                  .reduce(prev => prev)}
                size={56}
              />
            )}
          />
          <Divider inset />
        </>
      ))}
      <Portal>
        <Dialog
          visible={isDialogViisble}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Type user email"
              value={userEmail}
              onChangeText={text => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => createChat()} loading={isLoading}>
              Save
            </Button>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() => setIsDialogVisible(true)}>
        <AddCircle size="60" color="#6750a4" variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};

//make this component available to the app
export default ChatList;
