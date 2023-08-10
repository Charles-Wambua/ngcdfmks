import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Modal, ActivityIndicator } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BottomModal } from "react-native-modals";


import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CollegesApplicants = () => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibile, setModalVisibile] = useState(false);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    axios
      .get("https://ngcdf.onrender.com/students/get-all-applicants")
      .then((response) => {
        setApplicants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const navigation = useNavigation();

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

  //   console.log("Before toggleOtherModal - modalVisibile:", modalVisibile);
  //   setModalVisibile(!modalVisibile);
  //   console.log("After toggleOtherModal - modalVisibile:", modalVisibile);
  // };
  useEffect(() => {
    console.log("Effect - modalVisibile:", modalVisibile);
  }, [modalVisibile]);


  const handleAction = (applicantId, action) => {
    setLoading(true); // Show activity indicator

    axios
      .put(`https://ngcdf.onrender.com/form/${applicantId}/action`, {
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

  const handleApplicantPress = (applicant) => {
    setSelectedApplicant(applicant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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
    }
    else if (selectedSort === "Approved") {
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
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#003580" size={50} />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, padding: 20, backgroundColor: "#f0f0f0" }}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Universities/Colleges/Tvets Applicants
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {applicants.map((applicant) => (
              <View key={applicant._id} style={styles.applicant}>
                <Text style={styles.name}>{applicant.name}</Text>
                <Text style={styles.info}>
                  Gender: {applicant.gender} | Institution:{" "}
                  {applicant.institution}
                </Text>
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? "#d9d9d9" : "#007bff",
                      padding: 10,
                      borderRadius: 5,
                      opacity: applicant.approved ? 0.5 : 1,
                    })}
                    onPress={() => handleAction(applicant._id, "approve")}
                    disabled={applicant.approved || loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        {applicant.approved ? "Approved" : "Approve"}
                      </Text>
                    )}
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? "#008000" : "#008000",
                      padding: 10,
                      borderRadius: 5,
                    })}
                    onPress={() => handleApplicantPress(applicant)}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      View Details
                    </Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? "#d9d9d9" : "#dc3545",
                      padding: 10,
                      borderRadius: 5,
                      opacity: applicant.declined ? 0.5 : 1,
                    })}
                    onPress={() => handleAction(applicant._id, "decline")}
                    disabled={applicant.declined || loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        {applicant.declined ? "Declined" : "Decline"}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedApplicant && (
                  <>
                    <Text style={styles.modalTitle}>Applicant Details</Text>
                    <Text style={styles.modalInfo}>
                      Name: {selectedApplicant.name}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Gender: {selectedApplicant.gender}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Email: {selectedApplicant.email}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Phone: {selectedApplicant.mobileNumber}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Admission Registration No.: {selectedApplicant.admRegNo}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Application Date: {selectedApplicant.applicationDate}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Course Duration: {selectedApplicant.courseDuration} years
                    </Text>
                    <Text style={styles.modalInfo}>
                      Family Status: {selectedApplicant.familyStatus}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Father's Income: {selectedApplicant.fatherIncome}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Mother's Income: {selectedApplicant.motherIncome}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Institution: {selectedApplicant.institution}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Location: {selectedApplicant.location}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Mobile Number: {selectedApplicant.mobileNumber}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Semester: {selectedApplicant.semester}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Level: {selectedApplicant.studyLevel}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Mode: {selectedApplicant.studyMode}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Year: {selectedApplicant.studyYear}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Sub Location: {selectedApplicant.subLocation}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Ward: {selectedApplicant.ward}
                    </Text>
                  </>
                )}

                <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
                    <Text style={styles.sortingOptionText}>
                      {filter.filter}
                    </Text>
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
        </ScrollView>
      )}
      {/* <ModalPortal>
            <BottomModal
              // onBackdropPress={() => setModalVisibile(!modalVisibile)}
              swipeDirection={["up", "down"]}
              swipeThreshold={200}
              footer={
                <ModalFooter>
                  <Pressable
                    onPress={() => applyFilter(selectedFilter)}
                    style={{
                      paddingRight: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginVertical: 10,
                      marginBottom: 30,
                    }}
                  >
                    <Text>Apply</Text>
                  </Pressable>
                </ModalFooter>
              }
              modalTitle={<ModalTitle title="Sort and Filter" />}
              modalAnimation={
                new SlideAnimation({
                  slideFrom: "bottom",
                })
              }
              onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
              visible={modalVisibile}
              onTouchOutside={() => setModalVisibile(!modalVisibile)}
            >
              <ModalContent style={{ width: "100%", height: 280 }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      marginVertical: 10,
                      flex: 2,
                      height: 280,
                      borderRightWidth: 1,
                      borderColor: "#E0E0E0",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Sort </Text>
                  </View>

                  <View style={{ flex: 3, margin: 10 }}>
                    {filters.map((item, index) => (
                      <Pressable
                        onPress={() => setSelectedFilter(item.filter)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                        key={index}
                      >
                        {selectedFilter.includes(item.filter) ? (
                          <FontAwesome name="circle" size={18} color="green" />
                        ) : (
                          <Entypo name="circle" size={18} color="black" />
                        )}

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            marginLeft: 6,
                          }}
                        >
                          {item.filter}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </ModalContent>
            </BottomModal>
          </ModalPortal> */}
    </>
  );
};

const styles = {
  applicant: {
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
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
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedApplicantInfo: {
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
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    paddingRight: 20,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
  },
};

export default CollegesApplicants;
