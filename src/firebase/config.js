import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGV0mPP7A_S1b7CvuBRE-XkVMUOAZ0R7U",
  authDomain: "levelup-12a29.firebaseapp.com",
  databaseURL: "https://levelup-12a29-default-rtdb.firebaseio.com",
  projectId: "levelup-12a29",
  storageBucket: "levelup-12a29.appspot.com",
  messagingSenderId: "676662974496",
  appId: "1:676662974496:web:66059c850e22e5134b4445",
  measurementId: "G-TP2T796JFY"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
const database = getDatabase();

const app2=firebase.initializeApp(firebaseConfig)
const firestore = app2.firestore();
export {  firestore, firebase };