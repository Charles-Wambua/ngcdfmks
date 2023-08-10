import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import Header from "../components/Header";

const FrontPage = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Fetch isAdmin status from AsyncStorage
    AsyncStorage.getItem('isAdmin')
      .then(value => {
        if (value === 'true') {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.log("Error fetching isAdmin status:", error);
      });
  }, []);
  const handleAdminButtonPress = () => {
    navigation.navigate("Admin");
  };

  const handleApplyButtonPress = () => {
    navigation.navigate("StudyLevel");
  };

  const handleDownloadButtonPress = () => {
    navigation.navigate("ViewForm");
  };

  const handleHelpButtonPress = () => {
    navigation.navigate("HelpScreen");
  };

  return (
    <>
      <Header />
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{ height: 200, width: 400, resizeMode: "center" }}
            source={{
              uri: "https://nairobireview.africa/wp-content/uploads/2023/03/3194926196.png",
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
            fontSize: 18,
            backgroundColor: "gray",
            borderColor: "gray",
            borderRadius: 7,
            marginHorizontal: 30,
            marginBottom:10
          }}
        >
          UNIVERSITIES AND HIGH SCHOOL BURSARIES
        </Text>
        <Text style={styles.p}>
          Please fill in the true information failure to which you will be
          disqualified.
        </Text>
        <Text style={styles.p}>
          After filling in the details, download the form which will be
          presented in person at the annual meeting day.
        </Text>
        <Text style={styles.p}>Machakos Town Constituency CDF Bursaries</Text>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>

        {isAdmin && ( // Only render the "Admin" button if isAdmin is true
        <Pressable style={styles.button} onPress={handleAdminButtonPress}>
          <Text style={styles.buttonText}>Admin</Text>
        </Pressable>
      )}

        <Pressable style={styles.button} onPress={handleApplyButtonPress}>
          <Text style={styles.buttonText}>Apply for Bursary</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleDownloadButtonPress}>
          <Text style={styles.buttonText}>Form and Options</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleHelpButtonPress}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </Pressable>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>
        <View style={styles.lineContainer}>
          <View style={[styles.line, { backgroundColor: "#008000" }]} />
          <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
          <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
          <View style={[styles.line, { backgroundColor: "#000000" }]} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#89adac",

    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#ffff",
    backgroundColor: "black",
    paddingTop: 70,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 20,

    marginBottom: 10,
  },

  line: {
    flex: 1,
    height: 5,
  },

  p: {
    fontSize: 20,
    fontWeight: "light",
    marginBottom: 20,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FrontPage;
