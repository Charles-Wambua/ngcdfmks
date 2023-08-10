import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios
  from "axios";
export default function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const importantFields = [
    { label: "Name", key: "name" },
    { label: "Gender", key: "gender" },
    { label: "Institution", key: "institution" },
    { label: "Family Status", key: "familyStatus" },
    { label: "ID", key: "id" },
    { label: "Admission Registration Number", key: "admRegNo" },
    { label: "Study Year", key: "studyYear" },
    { label: "Semester", key: "semester" },
    { label: "Course Duration", key: "courseDuration" },
    { label: "Mobile Number", key: "mobileNumber" },
    { label: "Email", key: "email" },
    { label: "Ward", key: "ward" },
    { label: "Location", key: "location" },
    { label: "Sub-Location", key: "subLocation" },
    { label: "Study Level", key: "studyLevel" },
    { label: "Study Mode", key: "studyMode" },
    { label: "Father's Income", key: "fatherIncome" },
    { label: "Mother's Income", key: "motherIncome" },
    { label: "Application Date", key: "applicationDate" },
  ];

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      setStudentData(parsedData);
      console.log("type: " + type, "\n data" + data);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      setStudentData(null);
      alert("No user found. Invalid QR code data.");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Permission to access the camera was denied.</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  const handleApproval = (action) => {
    if (!studentData) return;
    const applicantId = studentData._id;
    axios
      .put(`https://machakoscdf.onrender.com/form/approve-applicant/${applicantId}`)
      .then((response) => {
        if (response.status === 200) {
          // Update the approval status locally in the state if needed
          setStudentData((prevData) => ({
            ...prevData,
            approved: action === "approve",
          }));
          alert("Approved")
          console.log("Approval status updated successfully!");
        }
      })
      .catch((error) => {
        console.error("Error updating approval status:", error);
      });
  };
  const handleDecline = (action) => {
    if (!studentData) return;
    const applicantId = studentData._id;
    axios
      .put(`https://ngcdf.onrender.com/form/decline-applicant/${applicantId}`)
      .then((response) => {
        if (response.status === 200) {
          // Update the approval status locally in the state if needed
          setStudentData((prevData) => ({
            ...prevData,
            approved: action === "decline",
          }));
          alert("Application canceled")
          console.log("Approval status updated successfully!");
        }
      })
      .catch((error) => {
        console.error("Error updating approval status:", error);
      });
  };

  return (
    <View style={styles.container}>
      {scanned && studentData ? (
        <>
          <View style={styles.table}>
            {importantFields.map((field) => (
              <View style={styles.tableRow} key={field.key}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.value}>{studentData[field.key]}</Text>
              </View>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Approve"
              onPress={() => handleApproval("approve")}
              color="green"
            />
            <Button
              title="Decline"
              onPress={() => console.log("Declined")}
              color="red"
            />
          </View>
        </>
      ) : (
        <View style={styles.barcodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#003580",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    width: "80%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  value: {},
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});
