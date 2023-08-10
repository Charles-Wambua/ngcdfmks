import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import StackNavigator from "./StackNavigator";



const Stack = createStackNavigator();
export default function App() {
  return (
    <StackNavigator/>
   
  );
}
