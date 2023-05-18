import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const configuration = {
  apiKey: "AIzaSyBFNc2kfHyjS47H2_lDTP_4csZ_yJWIHB0",
  authDomain: "remindly-4a3f6.firebaseapp.com",
  databaseURL:
    "https://remindly-4a3f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "remindly-4a3f6",
  storageBucket: "remindly-4a3f6.appspot.com",
  messagingSenderId: "1077035363204",
  appId: "1:1077035363204:web:c922aace7abb0fd596cbd1",
  measurementId: "G-90C273Q2HN",
};

// Initialize Firebase
const app = initializeApp(configuration);


const db = getFirestore(app);
export default db;
