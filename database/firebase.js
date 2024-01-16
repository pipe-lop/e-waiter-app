import firebase from 'firebase/app';
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm09UY1xBpuRpFxB49cp82dOtEfXBQxm4",
  authDomain: "e-waiter-app-firebase.firebaseapp.com",
  projectId: "e-waiter-app-firebase",
  storageBucket: "e-waiter-app-firebase.appspot.com",
  messagingSenderId: "987053858507",
  appId: "1:987053858507:web:2e363e23e8fcfe9988854e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export default {
  firebase,
  db,
  auth
}