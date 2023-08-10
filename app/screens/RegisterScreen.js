import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [
          {
            text: "cancel",
            onPress: () => {},
            style: "cancel",
          },
          { text: "ok", onPress: () => {} },
        ],
        { cancelable: false }
      );
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;
        setDoc(doc(db, "users", `${uid}`), {
          email: user,
          phone: phone,
          isAdmin: false,
        });
        AsyncStorage.setItem('isAdmin', 'false');
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setPhone("");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Registration Error:", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
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
            Sign Up
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
            Create an account
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
          <Text style={{ fontWeight: "500", fontSize: 17 }}>Phone number</Text>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="enter your phone number"
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
          onPress={register}
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
              Register
            </Text>
          )}
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Already have an account? Sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
