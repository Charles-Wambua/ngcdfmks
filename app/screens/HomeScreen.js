import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";

import { Ionicons } from "@expo/vector-icons";


const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Mksngcdf.com",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  });
  return (
    <View>
      
      <ScrollView>
        <View
          style={{
            margin: 20,
            borderColor: "#ffc72c",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          {/* Destination */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#ffc72c",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder="Enter your Destination" />
          </Pressable>
          {/* selected dates */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#ffc72c",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <AntDesign name="calendar" size={24} color="black" />
            <DatePicker
                
              style={{ width: 350, height: 30, borderRadius: 0, borderWidth:0 }}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                  borderRadius: 0,
                }, 

                headerStyle: {
                  backgroundColor: "#003580",
                },
                contetText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                  
                }
              }}
             
              selectedBgColor="#ffc72c"
              centerAlign // optional text will align center or not
              allowFontScaling={false} // optional
              placeholder={"Apr 27, 2018 → Jul 10, 2018"}
              mode={"range"}
            />
          </Pressable>
          {/* Rooms and guest */}
          <Pressable></Pressable>
          {/* search */}
          <Pressable></Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
