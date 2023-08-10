import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"; // Correct import statement

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewForm from "./app/screens/ViewForm";
import FrontPage from "./app/screens/FirstScreen";

import Admin from "./app/screens/Admin";
import React from "react";

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import StatusScreen from "./app/screens/StatusScreen";
import LevelScreen from "./app/screens/LevelScreen";
import HighSchool from "./app/screens/HighSchool";
import QrCode from "./app/components/QrCode";
import CollegesApplicants from "./app/screens/CollegesApplicants";
import ApprovedUni from "./app/screens/ApprovedUni";
import HighSchoolApplicants from "./app/screens/HighSchoolApplicants";
import ApprovedHighSchool from "./app/screens/ApprovedHighSchool";
import HelpScreen from "./app/screens/HelpScreen";
import AdminMessagesScreen from "./app/screens/AdminMessagesScreen";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={FrontPage}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <Feather name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Saved",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="form-select"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons name="form-textarea" size={24} />
              ),
          }}
        />
        <Tab.Screen
          name="ViewForm"
          component={ViewForm}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="list-alt" size={24} color="black" />
              ) : (
                <FontAwesome5 name="list-alt" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, tabBarLabel: "Login" }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Status"
          component={StatusScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={FrontPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudyLevel"
          component={LevelScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HighSchool"
          component={HighSchool}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ViewForm"
          component={ViewForm}
         options={{ headerShown: false }}
       />
       <Stack.Screen
          name="QrCode"
          component={QrCode}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="CollegeApplicants"
         component={CollegesApplicants}
         options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApprovedApplicants"
         component={ApprovedUni}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="HighSchoolAppli"
         component={HighSchoolApplicants}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ApprovedHighSchoolAppli"
         component={ApprovedHighSchool}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="HelpScreen"
         component={HelpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMessages"
         component={AdminMessagesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
