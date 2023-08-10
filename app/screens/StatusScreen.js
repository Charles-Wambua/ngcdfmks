import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Make sure to import AsyncStorage
import Header from "../components/Header";

const StatusScreen = () => {
  const [status, setStatus] = useState("Apply"); // Initial status

  useEffect(() => {
    // Simulate fetching the applicant details from the server
    const fetchApplicantDetails = async () => {
      try {
        const formId = await AsyncStorage.getItem("formId");
        if (formId) {
          console.log(formId);
          
          // Fetch data from the first link
          const response1 = await fetch(`https://ngcdf.onrender.com/high-school/approved/${formId}`);
          const data1 = await response1.json();
          console.log(data1);
          
          // Fetch data from the second link
          const response2 = await fetch(`https://ngcdf.onrender.com/students/approved/${formId}`);
          const data2 = await response2.json();
          console.log(data2);
  
          // Update the status based on approval status from the first link
          const status1 = data1.approved ? "Approved" : "Applied";
          
          // Update the status based on approval status from the second link
          const status2 = data2.approved ? "Approved" : "Applied";
  
          // Determine the final status based on both scenarios
          const finalStatus = status1 === "Approved" || status2 === "Approved" ? "Approved" : "Applied";
          setStatus(finalStatus)
  
          // Now you can use the finalStatus as needed in your application
  
        } else {
          setStatus("Apply"); // No formId available, set to "Apply"
        }
      } catch (error) {
        console.error("Error fetching applicant details:", error);
      }
    };
  
    fetchApplicantDetails();
  }, []);
  

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
          <View style={styles.statusInfo}>
            {status === "Apply" && <Text style={styles.infoText}>Tap the button on the start screen to begin your application.</Text>}
            {status === "Applied" && <Text style={styles.infoText}>Your application is pending review. We'll notify you once it's processed.</Text>}
            {status === "Approved" && <Text style={styles.infoText}>Congratulations! Your application has been approved. You will receive further instructions via email.</Text>}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  statusContainer: {
    backgroundColor: "#003580",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  statusText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  statusInfo: {
    marginTop: 10,
    maxWidth: "80%",
  },
  infoText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default StatusScreen;
