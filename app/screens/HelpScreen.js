import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const HelpScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      if (!email || !phone) {
        Alert.alert("Missing information", "Please enter both email and phone.");
        return;
      }

      if (message.trim() === "") {
        Alert.alert("Message is empty", "Please enter your message.");
        return;
      }

      const timestamp = Timestamp.now();
      const messageData = {
        senderEmail: email,
        senderPhone: phone,
        message,
        timestamp,
      };
      await setDoc(doc(db, 'messages', `${timestamp}`), messageData);

      // Here you can implement sending the message to the admin
      // You can use a backend service or any suitable method to achieve this

      Alert.alert("Message Sent", "Your message has been sent to the admin.");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <>
    <Header />
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Help and Support</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.input}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          multiline
          style={[styles.input, styles.multilineInput]}
        />
        <Pressable style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  </>
  );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
      },
      contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        width: "100%",
        fontSize: 16,
      },
      multilineInput: {
        height: 120,
        textAlignVertical: "top",
      },
      button: {
        backgroundColor: "#2196F3",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },
   
    
});

export default HelpScreen;
