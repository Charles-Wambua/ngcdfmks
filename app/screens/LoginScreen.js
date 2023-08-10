import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { doc, getDoc } from "firebase/firestore"; // Import the necessary Firestore functions
import { db } from "../../FirebaseConfig"; // Import your Firebase configuration


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
  
          console.log("Fetched user data:", userData);
  
          // Store isAdmin status in AsyncStorage
          AsyncStorage.setItem('isAdmin', userData.isAdmin.toString());
  
          console.log("isAdmin:", userData.isAdmin); // Debugging
          
          setIsLoading(false);
          setEmail("");
          setPassword("");
  
          // Redirect the user to the appropriate screen based on isAdmin status
          if (userData.isAdmin) {
            console.log("Navigating to Admin screen"); // Debugging
            navigation.navigate("Admin");
          } else {
            console.log("Navigating to Home screen"); // Debugging
            navigation.navigate("Home");
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Invalid credentials");
        console.log("Login Error:", error);
      });
  };
  

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
        }
        if (authUser) {
          navigation.navigate("Home");
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView style={{}}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
            Sign In to your account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="enter your email address"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>Password</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              placeholder="enter your password"
              style={{ flex: 1 }}
            />
            <Pressable onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={login}
          disabled={isLoading}
          style={{
            width: 200,
            backgroundColor: isLoading ? "gray" : "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
