import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const LevelScreen = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const navigation=useNavigation()

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleSubmit = () => {
      if (selectedLevel === "Universities and Colleges") {
       navigation.navigate("WelcomeScreen")
      } else {
          navigation.navigate("HighSchool")
   }
    console.log("Selected Level:", selectedLevel);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.heading}>Select Study Level</Text>

        <View style={styles.radioGroup}>
          {/* High School Radio Button */}
          <Pressable
            style={[
              styles.radioButton,
              selectedLevel === "High School" && styles.radioButtonSelected,
            ]}
            onPress={() => handleSelectLevel("High School")}
          >
            <Text style={styles.radioLabel}>High School</Text>
          </Pressable>

          {/* Universities and Colleges Radio Button */}
          <Pressable
            style={[
              styles.radioButton,
              selectedLevel === "Universities and Colleges" &&
                styles.radioButtonSelected,
            ]}
            onPress={() => handleSelectLevel("Universities and Colleges")}
          >
            <Text style={styles.radioLabel}>Universities and Colleges</Text>
          </Pressable>
        </View>

       
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#003580",
  },
  radioButtonSelectedText: {
    color: "white",
  },
  radioLabel: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#003580",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LevelScreen;
