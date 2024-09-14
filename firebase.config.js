// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA2KZfVfM_ilNAmJVPRH1HpaacI54gXxY",
  authDomain: "memories-849d3.firebaseapp.com",
  projectId: "memories-849d3",
  storageBucket: "memories-849d3.appspot.com",
  messagingSenderId: "618956780737",
  appId: "1:618956780737:web:594381b2af88b1fa091040",
  measurementId: "G-94HLST8TY7",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANAL = getAnalytics(FIREBASE_APP);
export const FIREBASE_STORE = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
