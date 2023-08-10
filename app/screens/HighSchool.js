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
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import Header from "../components/Header";
export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [institution, setInstitution] = useState("");
  const [admRegNo, setAdmRegNo] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [semester, setSemester] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const [fatherIncome, setFatherIncome] = useState("");
  const [motherIncome, setMotherIncome] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);
  const [selectedGender, setSelectedGender] = React.useState("");

  const [selectedFamilyStatus, setSelectedFamilyStatus] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idCardFrontImage, setIdCardFrontImage] = useState(null);
  const [idCardBackImage, setIdCardBackImage] = useState(null);
  const [votersCardImage, setVotersCardImage] = useState(null);
  const [feesStructureImage, setFeesStructureImage] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [birthCertificate, setBirthCertificate] = useState("");
  // const phoneInput = useRef < PhoneInput > (null);
  const handleFormSubmit = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gender", selectedGender);
      formData.append("parentId", id);
      formData.append("birthCertificate", birthCertificate);
      formData.append("institution", institution);
      formData.append("admRegNo", admRegNo);
      formData.append("studyYear", studyYear);
      formData.append("semester", semester);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      formData.append("ward", selectedWard);
      formData.append("location", selectedLocation);
      formData.append("subLocation", selectedSubLocation);
      formData.append("familyStatus", selectedFamilyStatus);
      formData.append("fatherIncome", fatherIncome);
      formData.append("motherIncome", motherIncome);
      formData.append("applicationDate", applicationDate);
     
      formData.append("images", {
        uri: idCardFrontImage, // URI of the image
        name: "idCardFrontImage.jpg", // Desired image name on the server
        type: "image/jpeg", // MIME type of the image
      });
      formData.append("images", {
        uri: idCardBackImage,
        name: "idCardBackImage.jpg",
        type: "image/jpeg",
      });
      formData.append("images", {
        uri: votersCardImage,
        name: "votersCardImage.jpg",
        type: "image/jpeg",
      });
      formData.append("images", {
        uri: feesStructureImage,
        name: "feesStructureImage.jpg",
        type: "image/jpeg",
      });

      console.log(formData);

      setIsLoading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("https://ngcdf.onrender.com/high-school/submit", formData, config)
        .then((response) => {
          console.log("Form submitted successfully");

          Alert.alert(
            "Form Submitted Successfully, proceed to download your form"
          );
          setIsLoading(false);
          console.log(response.data);
          const formId = response.data.id;
          console.log("formid: ", formId);
          AsyncStorage.setItem("formId", formId);
          // Clear form fields after submission
          clearFormFields();
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("API Error:", error);
          if (error.response && error.response.status === 400) {
            alert(error.response.data.error);
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    }
  };

  const clearFormFields = () => {
    setName("");
    setSelectedGender("");
    setID("");
    setInstitution("");
    setAdmRegNo("");
    setStudyYear("");
    setSemester("");
    setMobileNumber("");
    setEmail("");
    setSelectedWard("");
    setSelectedLocation("");
    setSelectedSubLocation("");
    setBirthCertificate("");
    setSelectedFamilyStatus("");
    setFatherIncome("");
    setMotherIncome("");
    setApplicationDate("");
    // Clear image fields
    setIdCardFrontImage(null);
    setIdCardBackImage(null);
    setVotersCardImage(null);
    setFeesStructureImage(null);
  };

  const modeofStudy = [
    { key: "1", value: "Regular" },
    { key: "2", value: "Part-time" },
    { key: "3", value: "Full-time" },
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
      semester === "" ||
      mobileNumber === "" ||
      email === "" ||
      ward === "" ||
      subLocation === "" ||
      familyStatus === "" ||
      fatherIncome === "" ||
      motherIncome === "" ||
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

  const openCamera = async (imageType) => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.granted) {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!image.cancelled) {
        // Determine which type of image is being captured and set the appropriate state
        if (imageType === "idCardFront") {
          setIdCardFrontImage(image.uri);
        } else if (imageType === "idCardBack") {
          setIdCardBackImage(image.uri);
        } else if (imageType === "votersCard") {
          setVotersCardImage(image.uri);
        } else if (imageType === "feesStructure") {
          setFeesStructureImage(image.uri);
        }

        setSelectedImage(image);
      }
    } else {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take pictures."
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
            HIGH SCHOOL BURSARY APPLICATION FORM MACHAKOS TOWN CONSTITUENCY
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
          <Text style={styles.label}>Parent's/Guardian's ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Kenyan National ID"
            value={id}
            onChangeText={handleIDChange}
          />

          <Text style={styles.label}>Applicant's Birth Certificate:</Text>
          <TextInput
            style={styles.input}
            placeholder="Birth Certificate Number"
            value={birthCertificate}
            onChangeText={handleBirthCertificateChange}
          />
          <Text style={styles.label}>School:</Text>
          <TextInput
            style={styles.input}
            placeholder="Your secondary school name"
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
            placeholder="form....."
            value={studyYear}
            onChangeText={setStudyYear}
          />
          <Text style={styles.label}>Term:</Text>
          <TextInput
            style={styles.input}
            placeholder="Term...."
            value={semester}
            onChangeText={setSemester}
          />

          <Text style={styles.label}>Parents/Guardian's Mobile Number:</Text>
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

          <Text style={styles.label}>Family Status:</Text>
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedFamilyStatus(val)}
            data={familyStatus}
            save="value"
            placeholder="Family status"
          />
          <Text style={styles.label}>Father's Income:</Text>
          <TextInput
            style={styles.input}
            placeholder="Father's Income"
            value={fatherIncome}
            onChangeText={setFatherIncome}
          />
          <Text style={styles.label}>Mother's Income:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mother's Income"
            value={motherIncome}
            onChangeText={setMotherIncome}
          />
          <Text style={styles.label}>Date of Application</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={applicationDate}
            onChangeText={handleApplicationDateChange}
          />
          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload ID Card Front Image:</Text>
            <Pressable
              onPress={() => {
                setCameraVisible(true);
                openCamera("idCardFront"); // Pass the image type
              }}
              style={styles.uploadButton}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </Pressable>
            {idCardFrontImage && (
              <Image
                source={{ uri: idCardFrontImage }}
                style={styles.uploadedImage}
              />
            )}
          </View>
          {/* Image Upload Section for ID Card Back */}
          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload ID Card Back Image:</Text>
            <Pressable
              onPress={() => {
                setCameraVisible(true);
                openCamera("idCardBack"); // Pass the image type
              }}
              style={styles.uploadButton}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </Pressable>
            {idCardBackImage && (
              <Image
                source={{ uri: idCardBackImage }}
                style={styles.uploadedImage}
              />
            )}
          </View>

          {/* Image Upload Section for Voters Card */}
          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload Voters Card Image:</Text>
            <Pressable
              onPress={() => {
                setCameraVisible(true);
                openCamera("votersCard"); // Pass the image type
              }}
              style={styles.uploadButton}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </Pressable>
            {votersCardImage && (
              <Image
                source={{ uri: votersCardImage }}
                style={styles.uploadedImage}
              />
            )}
          </View>

          {/* Image Upload Section for Fees Structure */}
          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload Fees Structure Image:</Text>
            <Pressable
              onPress={() => {
                setCameraVisible(true);
                openCamera("feesStructure"); // Pass the image type
              }}
              style={styles.uploadButton}
            >
              <Text style={styles.buttonText}>Take Picture</Text>
            </Pressable>
            {feesStructureImage && (
              <Image
                source={{ uri: feesStructureImage }}
                style={styles.uploadedImage}
              />
            )}
          </View>

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
            Note: This application form is for Secondary School students in
            Machakos Town Sub-County. For you to be considered, provide truthful
            information else you will be disqulified. Ensure you upload the
            following for you to be considered:
            {"\n"}
            {"\n"}
            1. Parents/Guardian national ID card or voters card
            {"\n"}
            2. Valid up-to-date fee balance structure, Stamped by your school's
            responsible stakeholders
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
  imageUploadContainer: {
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#003580",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#999999",
  },
});
