import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { ScrollView } from "react-native-gesture-handler";

const AdminMessagesScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollectionRef = collection(db, 'messages');
        const messagesSnapshot = await getDocs(messagesCollectionRef);

        const messagesData = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.senderDetails}>
        From: {item.senderEmail} | {item.senderPhone}
      </Text>
    </View>
  );

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Admin Messages</Text>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageList: {
    flexGrow: 1,
  },
  messageItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
});

export default AdminMessagesScreen;
