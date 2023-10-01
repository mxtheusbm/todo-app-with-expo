// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQq3VVYkrEn6LFXersUr5jf2j_SsPBcQg",
  authDomain: "todoapp-81a7f.firebaseapp.com",
  projectId: "todoapp-81a7f",
  storageBucket: "todoapp-81a7f.appspot.com",
  messagingSenderId: "863327967637",
  appId: "1:863327967637:web:30ac92522a5aa03841fe9c",
  measurementId: "G-9B4PVH9QBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app, db}