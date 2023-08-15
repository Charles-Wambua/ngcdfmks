import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import Header from "../components/Header";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ApprovedUni = () => {
  const [loading, setLoading] = useState(true);
  const [approvedApplicants, setApprovedApplicants] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState(null);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    fetchApprovedApplicants();
  }, []);
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
    // {
    //   id: "4",
    //   filter: "Approved",
    // },
  ];
  const fetchApprovedApplicants = () => {
    fetch("https://ngcdf.onrender.com/students/approved-applicants")
      .then((response) => response.json())
      .then((data) => {
        setApprovedApplicants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching approved applicants:", error);
        setLoading(false);
      });
  };
  

  const applySort = (selectedSort) => {
    let sortedApplicants = [...approvedApplicants]; // Use approvedApplicants for sorting

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
    }
      else if (selectedSort === "Sub-location") {
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
    // ... Add more sorting conditions for other filters

    // Update the approvedApplicants state with the sorted applicants
    setApprovedApplicants(sortedApplicants);

    // Close the sorting modal
    setSortingModalVisible(false);
  };
  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #aaa;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .qrcode-imagee {
            width: 90px;
            height: 90px;
            padding-right: 10px;
            
            
          }
        </style>
      </head>
      <body>
      <img
      src="https://ngcdf.go.ke/wp-content/uploads/2020/01/cropped-cdf-official-logo.png"
     class="qrcode-imagee"
    />
        <h1>Approved Applicants</h1>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Adm/Reg Number</th>
            <th>Institution</th>
            <th>Program</th>
          </tr>
          ${approvedApplicants.map(
            (applicant, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${applicant.name}</td>
              <td>${applicant.admRegNo}</td>
              <td>${applicant.institution}</td>
              <td>${applicant.program}</td>
            </tr>
          `
          )}
        </table>
      </body>
    </html>
  `;

    const pdfFile = await Print.printToFileAsync({ html: htmlContent });
    if (pdfFile.uri) {
      Sharing.shareAsync(pdfFile.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share PDF",
      });
    }
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
       

        

      
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>Approved Applicants</Text>
        {loading ? (
          <ActivityIndicator color="#003580" size="large" />
        ) : (
          <FlatList
            data={approvedApplicants}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.applicantItem}>
                <Text style={styles.applicantName}>{item.name}</Text>
                <Text style={styles.applicantInfo}>
                  Adm/Reg Number: {item.admRegNo}
                </Text>
                <Text style={styles.applicantInfo}>
                  Institution: {item.institution}
                </Text>
              </View>
            )}
          />
        )}
        <Pressable style={styles.downloadButton} onPress={generatePDF}>
          <Text style={styles.downloadButtonText}>Download as PDF</Text>
        </Pressable>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign
      : "center",
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
  applicantItem: {
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
  applicantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  applicantInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ApprovedUni;
