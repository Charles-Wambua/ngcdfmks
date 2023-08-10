import React, { useEffect, useState } from "react";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch the isAdmin status from AsyncStorage
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

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://ngcdf.go.ke/wp-content/uploads/2020/01/cropped-cdf-official-logo.png",
            }}
          />
          <Text style={styles.headerText}>
            Machakos Town Sub-County NGCDF
          </Text>
        </View>
      </View>
      <View style={styles.navigationButtons}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.buttonContainer}
        >
          <Entypo name="home" size={24} color="white" />
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Status")}
          style={styles.buttonContainer}
        >
          <MaterialIcons name="pending" size={24} color="white" />
          <Text style={styles.buttonText}>Check Status</Text>
        </Pressable>
        {isAdmin && (
          <Pressable
            onPress={() => navigation.navigate("Admin")}
            style={styles.buttonContainer}
          >
            <Entypo name="user" size={24} color="white" />
            <Text style={styles.buttonText}>Admin</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    textAlign: "center",
    paddingTop: 70,
    backgroundColor: "#003580",
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginRight: 5,
    marginLeft: 15,
  },
  headerText: {
    padding: 20,
    color: "white",
    fontSize: 22,
    fontWeight: "800",
  },
  navigationButtons: {
    backgroundColor: "#003580",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 8,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Header;
