import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import QrCode from "../components/QrCode";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function Admin() {
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [totalHighSchoolApplicants, setTotalHighSchoolApplicants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisibile, setModalVisibile] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://ngcdf.onrender.com/applicants/total_applicants")
      .then((response) => {
        setTotalApplicants(response.data.totalApplicants);
        console.log(totalApplicants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://ngcdf.onrender.com/high-school/count")
      .then((response) => {
        setTotalHighSchoolApplicants(response.data.count);
        console.log(totalHighSchoolApplicants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <View style={styles.container}>
          <Text style={styles.mainText}>Loading...</Text>
        </View>
      ) : (
        <ScrollView
          style={{
            padding: 20,
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("QrCode")}
            style={{
              marginVertical: 20,
              backgroundColor: "#D3D3D3",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", textAlign:"center" }}>
              Scan Documents
            </Text>
            </Pressable>
            <View  style={{
              marginVertical: 20,
              backgroundColor: "#D3D3D3",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
               <Text style={{fontSize:24, fontWeight:"800", textAlign:"center", paddingBottom:15, color:"#003580" }}>Universities and Colleges</Text>
          <Pressable
            onPress={() => navigation.navigate("CollegeApplicants")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 30,
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              University/Colleges Applicants
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                borderColor: "red",
                borderRadius: 15,
                backgroundColor: "gray",
                padding: 10,
                borderWidth: 2,
              }}
            >
              {totalApplicants}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("ApprovedApplicants")}
            style={{
              marginVertical: 20,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Approved University Applicants
            </Text>
          </Pressable>
            </View>
            <View
            style={{
              marginVertical: 20,
              backgroundColor: "#D3D3D3",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              }}>
              <Text style={{fontSize:24, fontWeight:"800", textAlign:"center", paddingBottom:15, color:"#003580" }}>HighSchool</Text>
          <Pressable
            onPress={() => navigation.navigate("HighSchoolAppli")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 30,
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
           
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                HighSchool Applicants
                  </Text>
                  <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                  borderColor: "red",
                  borderRadius: 15,
                  backgroundColor: "gray",
                  padding: 10,
                  borderWidth: 2,
                }}
            >
              {totalHighSchoolApplicants}
            </Text>
           
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ApprovedHighSchoolAppli")}
            style={{
              marginVertical: 20,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Approved HighSchool Applicants
            </Text>
              </Pressable>
            </View>
            <Pressable
            onPress={() => navigation.navigate("AdminMessages")}
            style={{
              marginVertical: 20,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", textAlign:"center" }}>
              Messages
            </Text>
              </Pressable>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flexDirection: "row", // Set flexDirection to "row"
    justifyContent: "flex-end", // Align items to the right end of the container
    padding: 20,
    fontSize: 17,
    fontWeight: "600",
  },
});
