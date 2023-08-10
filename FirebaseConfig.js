
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDVLpjk1xlk0TnCQ-LcfWRAxr398s6UAVo",
  authDomain: "mksngcdf.firebaseapp.com",
  projectId: "mksngcdf",
  storageBucket: "mksngcdf.appspot.com",
  messagingSenderId: "976762918768",
  appId: "1:976762918768:web:40f038a136ecdbebcfa1b5",
  measurementId: "G-1HKQM2HP6W"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db= getFirestore(app)

export {auth, db}