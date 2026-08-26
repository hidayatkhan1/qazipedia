// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHUl7IGv0gEp43fcJMZuB31TCXa2O8AHw",
  authDomain: "qazipedia-cd938.firebaseapp.com",
  projectId: "qazipedia-cd938",
  storageBucket: "qazipedia-cd938.firebasestorage.app",
  messagingSenderId: "273787299066",
  appId: "1:273787299066:web:6aa97977e071290175d543",
  measurementId: "G-G5Y6S1ERY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
