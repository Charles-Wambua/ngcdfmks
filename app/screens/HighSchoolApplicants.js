import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,

  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";

const HighSchoolApplicants = () => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newApprovalStatus, setNewApprovalStatus] = useState(false);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);

  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    fetch("https://ngcdf.onrender.com/high-school/applicants")
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
        setLoading(false);
      });
  };
  const handleAction = (applicantId, action) => {
    setLoading(true); // Show activity indicator

    axios
      .put(`https://ngcdf.onrender.com/high-school/${applicantId}/action`, {
        action,
      })
      .then((response) => {
        if (response.status === 200) {
          // Update the approval status in the local state
          setApplicants((prevApplicants) =>
            prevApplicants.map((applicant) =>
              applicant._id === applicantId
                ? { ...applicant, approved: action === "approve" }
                : applicant
            )
          );
        }
        setLoading(false);
        alert("sucess");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error handling action:", error);
      });
  };
  const filters = [
    {
      id: "0",
      filter: "Institution",
    },

    {
      id: "1",
      filter: "Application date",
    },
    {
      id: "2",
      filter: "Sub-location",
    },
    {
      id: "3",
      filter: "Year of study",
    },
    {
      id: "4",
      filter: "Approved",
    },
  ];
  const applySort = (selectedSort) => {
    let sortedApplicants = [...applicants]; // Create a copy of the original applicants

    // Apply sort logic based on the selectedSort
    if (selectedSort === "Institution") {
      // Example: Sort by Institution
      sortedApplicants.sort((a, b) => {
        if (a.institution && b.institution) {
          return a.institution.localeCompare(b.institution);
        }
        return 0;
      });
    } else if (selectedSort === "Application date") {
      // Example: Sort by Application date
      sortedApplicants.sort((a, b) => {
        if (a.applicationDate && b.applicationDate) {
          return a.applicationDate.localeCompare(b.applicationDate);
        }
        return 0;
      });
    } else if (selectedSort === "Sub-location") {
      // Example: Sort by Sub-location
      sortedApplicants.sort((a, b) => {
        if (a.subLocation && b.subLocation) {
          return a.subLocation.localeCompare(b.subLocation);
        }
        return 0;
      });
    } else if (selectedSort === "Year of study") {
      // Example: Sort by Year of study
      sortedApplicants.sort((a, b) => {
        if (a.yearOfStudy && b.yearOfStudy) {
          return a.yearOfStudy.localeCompare(b.yearOfStudy);
        }
        return 0;
      });
    } else if (selectedSort === "Approved") {
      // Sort by Approved status
      sortedApplicants.sort((a, b) => {
        // Unapproved applicants come first
        if (!a.approved && b.approved) {
          return -1;
        }
        if (a.approved && !b.approved) {
          return 1;
        }
        return 0; // If both are either approved or unapproved
      });
    }

    // ... Add more sorting conditions for other filters

    // Update the applicants state with the sorted applicants
    setApplicants(sortedApplicants);

    // Close the sorting modal
    setSortingModalVisible(false);
  };

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };
  const openImageModal = (imagePath) => {
    setEnlargedImage(imagePath);
  };

  const closeImageModal = () => {
    setEnlargedImage(null);
  };

  const renderImages = (images) => {
    return images.map((image, index) => (
      <Pressable key={index} onPress={() => openImageModal(image)}>
        <Image style={styles.modalSmallImage} source={{ uri: image }} />
      </Pressable>
    ));
  };

  const renderModal = () => {
    if (!selectedApplicant) {
      return null;
    }

    const { images, name, institution, gender, subLocation } =
      selectedApplicant;

    return (
      <Modal
        visible={selectedApplicant !== null}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.applicantName}>{name}</Text>
            <Text style={styles.applicantDetails}>
              Institution: {institution}
            </Text>
            <Text style={styles.applicantDetails}>Gender: {gender}</Text>
            <Text style={styles.applicantDetails}>
              Sublocation: {subLocation}
            </Text>
            {renderImages(images)}
            {enlargedImage && (
              <Pressable onPress={closeImageModal}>
                <Image
                  style={styles.enlargedImage}
                  resizeMode="contain"
                  source={{ uri: enlargedImage }}
                />
              </Pressable>
            )}
            <Pressable onPress={closeModal}>
              <Text
                style={{
                  color: "white",
                  padding: 10,
                  backgroundColor: "#003580",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <Header />
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setSortingModalVisible(true)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>

        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate("Map", {
              searchResults: searchPlaces,
            })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={applicants}
            renderItem={({ item }) => (
              <View style={styles.applicantContainer}>
                <Pressable onPress={() => openModal(item)}>
                  <View style={styles.applicantContainerr}>
                    <View style={styles.applicantInfo}>
                      <Text style={styles.applicantName}>{item.name}</Text>
                      <Text style={styles.applicantDetails}>
                        Institution: {item.institution}
                      </Text>
                      <Text style={styles.applicantDetails}>
                        Gender: {item.gender}
                      </Text>
                      <Text style={styles.applicantDetails}>
                        Sublocation: {item.subLocation}
                      </Text>
                    </View>
                    <View style={styles.applicantImages}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: item.images[0] }}
                      />
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: item.images[1] }}
                      />
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: item.images[2] }}
                      />
                    </View>
                  </View>
                </Pressable>
                <View style={styles.buttonsContainer}>
                  {item.approved ? (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="checkmark" size={24} color="gray" />
                      <Text style={{ marginLeft: 5, color: "gray" }}>
                        Approved
                      </Text>
                    </View>
                  ) : (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color="green"
                      onPress={() => handleAction(item._id, "approve")}
                    />
                  )}
                  <Ionicons
                    name="eye"
                    size={24}
                    color="blue"
                    onPress={() => openModal(item)}
                  />
                  <Ionicons
                    name="close"
                    size={24}
                    color="red"
                    onPress={() => handleAction(item._id, "decline")}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
        {renderModal()}
        <Modal
          visible={sortingModalVisible}
          transparent={true}
          onRequestClose={() => setSortingModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.sortingModalContent}>
              <Text style={styles.modalTitle}>Sort by</Text>
              {filters.map((filter) => (
                <Pressable
                  key={filter.id}
                  style={styles.sortingOption}
                  onPress={() => applySort(filter.filter)}
                >
                  <Text style={styles.sortingOptionText}>{filter.filter}</Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setSortingModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  applicantContainer: {
    flexDirection: "column",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  applicantContainerr: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  applicantInfo: {
    marginBottom: 8,
  },
  applicantImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  applicantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  applicantDetails: {
    marginTop: 4,
    fontSize: 16,
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.85,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  modalSmallImage: {
    width: 70, // Adjust this size as needed
    height: 70, // Adjust this size as needed
    borderRadius: 8,
    marginVertical: 8,
  },
  enlargedImage: {
    width: 350, // Adjust this size as needed
    height: 300, // Adjust this size as needed
    borderRadius: 8,
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sortingModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sortingOption: {
    paddingVertical: 10,
  },
  sortingOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default HighSchoolApplicants;
