// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase,onValue,ref } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyDk1VGVJ8P45mNgVCyUk0nCsXazyj3CN_U",
  authDomain: "project8-e52ba.firebaseapp.com",
  projectId: "project8-e52ba",
  storageBucket: "project8-e52ba.firebasestorage.app",
  messagingSenderId: "210866821998",
  appId: "1:210866821998:web:ebf6796f61fac444a5bf7f",
  measurementId: "G-VGC5S8YLMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const author=getAuth(app)
export const database=getDatabase(app)
export { ref, onValue };

