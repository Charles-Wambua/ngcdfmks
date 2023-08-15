import React, { useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import Header from "../components/Header";
export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [institution, setInstitution] = useState("");
  const [admRegNo, setAdmRegNo] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [semester, setSemester] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [fatherIncome, setFatherIncome] = useState("");
  const [motherIncome, setMotherIncome] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [selectedmodeofstudy, setSelectedModeofStudy] = React.useState("");
  const [selectedFamilyStatus, setSelectedFamilyStatus] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [birthCertificate, setBirthCertificate] = useState("");
  // const phoneInput = useRef < PhoneInput > (null);

  const handleFormSubmit = () => {
    if (validateForm()) {
      const formData = {
        name: name,
        gender: selectedGender,
        id: id,
        birthCertificate: birthCertificate,
        institution: institution,
        admRegNo: admRegNo,
        studyYear: studyYear,
        semester: semester,
        courseDuration: courseDuration,
        mobileNumber: mobileNumber,
        email: email,
        ward: selectedWard,
        location: selectedLocation,
        subLocation: selectedSubLocation,
        studyLevel: studyLevel,
        studyMode: selectedmodeofstudy,
        familyStatus: selectedFamilyStatus,
        fatherIncome: fatherIncome,
       
        applicationDate: applicationDate,
      };
      function generateFormId() {
        return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        );
      }
      setIsLoading(true);
      axios
        .post("https://ngcdf.onrender.com/form/post", formData)
        .then((response) => {
          console.log("Form submitted successfully");

          Alert.alert(
            "Form Submitted Successfuly, proceed to download your form"
          );
          setIsLoading(false);
          console.log(response.data);
          const formId = response.data.id;
          console.log("formid: ", formId);
          AsyncStorage.setItem("formId", formId);
          setName("");
          setSelectedGender("");
          setID("");
          setInstitution("");
          setAdmRegNo("");
          setStudyYear("");
          setSemester("");
          setCourseDuration("");
          setMobileNumber("");
          setEmail("");
          setSelectedWard("");
          setSelectedLocation("");
          setSelectedSubLocation("");
          setBirthCertificate("");
          setStudyLevel("");
          setSelectedModeofStudy("");
          setSelectedFamilyStatus("");
          setFatherIncome("");
          
          setApplicationDate("");
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.status === 400) {
            alert(error.response.data.error);
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    }
  };
  const levelOfStudy = [
    { key: "1", value: "Degree" },
    { key: "2", value: "Diploma" },
    { key: "3", value: "Certificate" },
  ];
  const modeofStudy = [
    { key: "1", value: "Regular" },
    { key: "2", value: "Part-time" },
    { key: "3", value: "Full-time" },
  ];
  const familyEarnings = [
    { key: "1", value: "Less than 20,000" },
    { key: "2", value: "Less than 50,000" },
    { key: "3", value: "Less than 100,000" },
    { key: "4", value: "N/A" },
  ];
  const familyStatus = [
    { key: "1", value: "Both parents alive" },
    { key: "2", value: "One parent alive" },
    { key: "3", value: "Orphan" },
  ];

  const gender = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ];

  const wardLocations = {
    Kalama: {
      Kalama: ["Kiitini", "Kyangala", "Nziuni"],
      Kimutwa: ["Konza", "Kaathi"],
      Kyangala: ["Kinoni"],
    },
    "Kola/Muumandu": {
      Kola: ["Iiyuni", "Katanga"],
      Lumbwa: ["Muumandu"],
    },
    "Machakos Central": {
      "Machakos Township": [
        "Eastleigh",
        "Misakwani",
        "Mjini",
        "Upper Kiandani",
      ],
    },
    Mua: {
      "Katheka Kai": ["Katheka Kai"],
      Mikuyu: ["Katelembo", "Kitanga"],
      Mua: ["Kyaani", "Kyanda", "Mua"],
    },
    "Mumbuni North": {
      Mumbuni: ["Lower Kiandani", "Mung'ala", "Kasinga"],
    },
    "Mutituni/Ngelani": {
      Mutituni: ["Kivutini", "Mutituni", "Nzoweni"],
      Ngelani: ["Kamuthanga", "Ngelani", "Nduu"],
    },
    "Muvuti/Kiima Kimwe": {
      Muvuti: ["Muvuti", "Kivandini"],
      "Kiima Kimwe": ["Katoloni", "Kiima Kimwe", "Mwanyani", "Mbilini"],
    },
  };

  const ward = Object.keys(wardLocations);
  const location = selectedWard
    ? Object.keys(wardLocations[selectedWard] || {})
    : [];
  const subLocation =
    selectedLocation && wardLocations[selectedWard]
      ? wardLocations[selectedWard][selectedLocation] || []
      : [];

  const handleWardChange = (val) => {
    setSelectedWard(val);
    setSelectedLocation(null);
    setSelectedSubLocation(null);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(val);
    setSelectedSubLocation(null);
  };

  const handleSubLocationChange = (val) => {
    setSelectedSubLocation(val);
  };
  const validateForm = () => {
    if (
      (id === "" && birthCertificate === "") || // Both ID and Birth Certificate are empty
      (id !== "" && birthCertificate !== "") // Both ID and Birth Certificate are filled
    ) {
      Alert.alert(
        "Error",
        "Please provide either the ID or Birth Certificate, but not both."
      );
      return false;
    }
    if (
      name === "" ||
      gender === "" ||
      (id === "" && birthCertificate === "") ||
      institution === "" ||
      admRegNo === "" ||
      studyYear === "" ||
      semester === "" ||
      courseDuration === "" ||
      mobileNumber === "" ||
      email === "" ||
      ward === "" ||
      // location === "" ||
      subLocation === "" ||
      studyLevel === "" ||
      // selectedmodeofstudy===""||
      familyStatus === "" ||
      fatherIncome === "" ||
      
      applicationDate === ""
    ) {
      Alert.alert("Error", "Please fill in all the required fields");
      return false;
    }
    return true;
  };
  const handleIDChange = (input) => {
    // Validate the ID input using a regular expression
    if (/^\d{0,8}$/.test(input)) {
      setID(input);
      // Clear the Birth Certificate input if ID is filled
      setBirthCertificate("");
    }
  };

  const handleBirthCertificateChange = (input) => {
    // Validate the Birth Certificate input length
    if (input.length <= 12) {
      setBirthCertificate(input);
      // Clear the ID input if Birth Certificate is filled
      setID("");
    }
  };
  const handleApplicationDateChange = (input) => {
    // Filter out non-digit characters to form a pure numeric string (DDMMYYYY)
    const numericDate = input.replace(/\D/g, "");

    // Format the numericDate as DD/MM/YYYY while handling variations
    if (numericDate.length <= 2) {
      setApplicationDate(numericDate);
    } else if (numericDate.length <= 4) {
      setApplicationDate(`${numericDate.slice(0, 2)}/${numericDate.slice(2)}`);
    } else if (numericDate.length <= 8) {
      setApplicationDate(
        `${numericDate.slice(0, 2)}/${numericDate.slice(
          2,
          4
        )}/${numericDate.slice(4)}`
      );
    }
  };

  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.heading}>
            BURSARY APPLICATION FORM MACHAKOS TOWN CONSTITUENCY
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Gender:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedGender(val)}
            data={gender}
            save="value"
            placeholder="Gender"
          />

          <Text style={styles.label}>ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Kenyan National ID"
            value={id}
            onChangeText={handleIDChange}
          />

          <Text style={styles.label}>Birth Certificate:</Text>
          <TextInput
            style={styles.input}
            placeholder="Birth Certificate Number"
            value={birthCertificate}
            onChangeText={handleBirthCertificateChange}
          />
          <Text style={styles.label}>Institution:</Text>
          <TextInput
            style={styles.input}
            placeholder="Institution"
            value={institution}
            onChangeText={setInstitution}
          />
          <Text style={styles.label}>Adm / Reg No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Adm / Reg No"
            value={admRegNo}
            onChangeText={setAdmRegNo}
          />
          <Text style={styles.label}>Year of Study:</Text>
          <TextInput
            style={styles.input}
            placeholder="Year of Study"
            value={studyYear}
            onChangeText={setStudyYear}
          />
          <Text style={styles.label}>Semester:</Text>
          <TextInput
            style={styles.input}
            placeholder="Semester"
            value={semester}
            onChangeText={setSemester}
          />
          <Text style={styles.label}>Course Duration:</Text>
          <TextInput
            style={styles.input}
            placeholder="Course Duration"
            value={courseDuration}
            onChangeText={setCourseDuration}
          />
          <Text style={styles.label}>Mobile Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Select Ward:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={handleWardChange}
            data={ward}
            save="value"
            placeholder="Select Ward"
          />

          <Text style={styles.label}>Select Location:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={handleLocationChange}
            data={location}
            save="value"
            placeholder="Select Location"
          />

          <Text style={styles.label}>Select Sub Location:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={handleSubLocationChange}
            data={subLocation}
            save="value"
            placeholder="Select Sub Location"
          />
          <Text style={styles.label}>Level of Study:</Text>
          
           <SelectList
            style={styles.inputt}
            setSelected={(val) => setStudyLevel(val)}
            data={levelOfStudy}
            save="value"
            placeholder="Level of Study"
          />
          <Text style={styles.label}>Mode of Study:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedModeofStudy(val)}
            data={modeofStudy}
            save="value"
            placeholder="Mode of study"
          />
          
          <Text style={styles.label}>Family Status:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedFamilyStatus(val)}
            data={familyStatus}
            save="value"
            placeholder="Family status"
          />
          <Text style={styles.label}>Family's Income:</Text>
       
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setFatherIncome(val)}
            data={familyEarnings}
            save="value"
            placeholder="Family Income"
          />
          <Text style={styles.label}>Date of Application</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={applicationDate}
            onChangeText={handleApplicationDateChange}
          />

          <Pressable
            onPress={handleFormSubmit}
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
                Submit
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Note: This application form shall be submitted in person during the
            students meeting. One will be required to sign and produce a copy of
            national id and school id, failure to which will lead to automatic
            disqualification
          </Text>
          <View style={styles.signatureContainer}>
            <View style={styles.stampPlaceholder} />
            <View style={styles.signaturePlaceholder} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#CCCCCC",
    paddingTop: 70,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  formContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputt: {
    height: 40,
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#003580",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  heading: {
    fontSize: 24,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
  },
  noteContainer: {
    marginBottom: 20,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666666",
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stampPlaceholder: {
    width: 100,
    height: 50,
    backgroundColor: "#CCCCCC",
    marginBottom: 10,
  },
  signaturePlaceholder: {
    width: 150,
    height: 50,
    backgroundColor: "#CCCCCC",
    marginBottom: 10,
  },
});
