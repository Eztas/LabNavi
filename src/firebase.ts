// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVsqY5oT4Z_FsAGj9K4nITJhWHD3qEghk",
  authDomain: "cosmo-list-app.firebaseapp.com",
  projectId: "cosmo-list-app",
  storageBucket: "cosmo-list-app.firebasestorage.app",
  messagingSenderId: "1006119656840",
  appId: "1:1006119656840:web:eb01a2473bd08ee034ae3d",
  measurementId: "G-9BETTN6DFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);