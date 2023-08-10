import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import ViewShot from "react-native-view-shot";

import AsyncStorage from "@react-native-async-storage/async-storage";

import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import axios from "axios";
import * as Print from "expo-print";

export default function ViewForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [qrCodeFilePath, setQrCodeFilePath] = useState(null);
  const viewShotRef = useRef();
  console.log(qrCodeFilePath);
  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const formId = await AsyncStorage.getItem("formId");
      const response = await axios.get(
        `https://ngcdf.onrender.com/form/get/${formId}`
      );
      setFormData(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handlePrint = async () => {
    if (loading) {
      console.log("Form data is still loading. Please wait.");
      return;
    }
    const captureOptions = {
      format: "png",
      result: "file",
      path: `${FileSystem.cacheDirectory}custom_qrcode.png`,
    };
    const captureResult = await viewShotRef.current.capture(captureOptions);

    // Copy the captured image to the local storage
    const localDirectory = FileSystem.documentDirectory + "local/";
    await FileSystem.makeDirectoryAsync(localDirectory, {
      intermediates: true,
    });
    const localPath = localDirectory + "custom_qrcode.png";
    await FileSystem.copyAsync({ from: captureResult, to: localPath });

    const imageFile = await FileSystem.readAsStringAsync(localPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      const htmlContent = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
        .subdiv h1 {
            color: #333333;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #000000;
            color: #666666;
            font-size: 16px;
            padding: 5px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
          }
          .other {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
          }
          .footeroption {
            text-align: center;
          }
          .footeroption h5 {
            font-size: 16px;
            margin-bottom: 5px;
          }
          .footeroption h6 {
            font-size: 14px;
            color: #666666;
            margin-top: 5px;
          }
          p {
            border: 1px solid #000000;
            color: #666666;
            font-size: 16px;
            margin-bottom: 5px;
            padding: 3px;
            border-radius: 5px;
          }
          .qrcode-image {
            width: 200px;
            height: 200px;
            
          }
          .qrcode-imagee {
            width: 90px;
            height: 90px;
            padding-right: 10px;
            
          }
          .subdiv {
            margin-left: 20px;
          }
          .all {
            display: flex;
            alignItems: center;
            

          }
        </style>
      </head>
      <body>
      <div class="all">
      <div class="subdiv">
        <img
          src="https://ngcdf.go.ke/wp-content/uploads/2020/01/cropped-cdf-official-logo.png"
         class="qrcode-imagee"
        />
      </div>
      <div  class"subdiv">
        <h1>Machakos Town Sub-County NgCDF Form</h1>
      </div>
    </div>
    
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>${formData.name}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>${formData.gender}</td>
          </tr>
       
        <tr>
        <td>ID</td>
        <td>${formData.id}</td>
      </tr>
      <tr>
      <td>Birth Certificate</td>
      <td>${formData.birthCertificate}</td>
    </tr>
    <tr>
    <td>Ward</td>
    <td>${formData.ward}</td>
  </tr>
        <tr>
            <td>Sub Location</td>
            <td>${formData.location}</td>
          </tr>
          <tr>
            <td>Sub Location</td>
            <td>${formData.subLocation}</td>
          </tr>
          <tr>
          <td>Institution</td>
          <td>${formData.institution}</td>
        </tr>
        <tr>
        <td>Study Year</td>
        <td>${formData.studyYear}</td>
      </tr>
      <tr>
      <td>Semester</td>
      <td>${formData.semester}</td>
    </tr>
          <tr>
            <td>Adm Reg No</td>
            <td>${formData.admRegNo}</td>
          </tr>
        
          <tr>
            <td>Course Duration</td>
            <td>${formData.courseDuration}</td>
          </tr>
          <tr>
          <td>Study Mode</td>
          <td>${formData.studyMode}</td>
        </tr>
          <!-- Add more rows for other form fields here -->
          <tr>
            <td>Email</td>
            <td>${formData.email}</td>
          </tr>
          <tr>
          <td>Mobile Number</td>
          <td>${formData.mobileNumber}</td>
        </tr>
          <tr>
            <td>Family Status</td>
            <td>${formData.familyStatus}</td>
          </tr>
          <tr>
            <td>Father's Income</td>
            <td>${formData.fatherIncome}</td>
          </tr>
        
         
         
          <tr>
            <td>Mother's Income</td>
            <td>${formData.motherIncome}</td>
          </tr>
         
          <tr>
            <td>Study Level</td>
            <td>${formData.studyLevel}</td>
          </tr>
         
          <tr>
          <td>Application Date</td>
          <td>${formData.applicationDate}</td>
        </tr>
        
          
         
        
          <!-- Add more rows for other initial outputs here -->
        </table>
        
        <h5> Note: This application form shall be submitted in person during the
        students meeting. One will be required to sign and produce a copy of
        national id and school id, failure to which will lead to automatic
        disqualification.<br/><br/> On submition, attach a copy of your national id or birthcertificate, and a copy of school id or letter.</h5>
        <div class="footer">
        <img src="data:image/png;base64,${imageFile}" class="qrcode-image" />
        <div class="other">
          <div class="footeroption">
            <h5>STAMP.........</h5><br/>
            <h6>CHIEF of the applicants location</h6>
          </div>
          <div class="footeroption">
            <h5>SIGN.........</h5> <br/>
            <h6>bursary applicant sign</h6>
          </div>
          </div>
        </div>
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

      //     const { uri } = await Print.printToFileAsync({ html: htmlContent });
      //     await Print.printAsync({ uri });
    } catch (error) {
      console.error("Error printing form:", error);
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#003580" size={50} />
        </View>
      ) : (
        <ScrollView>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <View style={styles.qrcode}>
              <QRCode
                value={JSON.stringify(formData)}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </View>
          </ViewShot>

          <View style={styles.container}>
            <Text style={styles.heading}>
              Machakos Town Constituency Bursary Form
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Name:</Text>
              <Text style={styles.fieldValue}>{formData.name}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Gender:</Text>
              <Text style={styles.fieldValue}>{formData.gender}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>
                Admission Registration Number:
              </Text>
              <Text style={styles.fieldValue}>{formData.admRegNo}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Application Date:</Text>
              <Text style={styles.fieldValue}>{formData.applicationDate}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Course Duration:</Text>
              <Text style={styles.fieldValue}>{formData.courseDuration}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Email:</Text>
              <Text style={styles.fieldValue}>{formData.email}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Family Status:</Text>
              <Text style={styles.fieldValue}>{formData.familyStatus}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Father's Income:</Text>
              <Text style={styles.fieldValue}>{formData.fatherIncome}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Institution:</Text>
              <Text style={styles.fieldValue}>{formData.institution}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Mobile Number:</Text>
              <Text style={styles.fieldValue}>{formData.mobileNumber}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Mother's Income:</Text>
              <Text style={styles.fieldValue}>{formData.motherIncome}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Semester:</Text>
              <Text style={styles.fieldValue}>{formData.semester}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Study Level:</Text>
              <Text style={styles.fieldValue}>{formData.studyLevel}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Study Mode:</Text>
              <Text style={styles.fieldValue}>{formData.studyMode}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Study Year:</Text>
              <Text style={styles.fieldValue}>{formData.studyYear}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Sublocation:</Text>
              <Text style={styles.fieldValue}>{formData.subLocation}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Ward:</Text>
              <Text style={styles.fieldValue}>{formData.ward}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Download Form" onPress={handlePrint} />
            </View>

            <View style={styles.stampPlaceContainer}>
              <Text style={styles.stampPlaceLabel}>Stamp</Text>
            </View>

            <View style={styles.signingPlaceContainer}>
              <Text style={styles.signingPlaceLabel}>Sign</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 70,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrcode: {
    marginTop: 70,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000000",

    flexDirection: "row",
    alignItems: "center",
  },
  fieldName: {
    fontWeight: "bold",
    margin: 10,
    justifyContent: "flex-start",
  },
  fieldValue: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  stampPlaceContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "tomato",
  },
  stampPlaceLabel: {
    fontWeight: "bold",
  },
  signingPlaceContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "dodgerblue",
  },
  signingPlaceLabel: {
    fontWeight: "bold",
  },
});
