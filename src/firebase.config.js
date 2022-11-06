import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfyO6Li2RKQfaQGgm0a0hwLoUCZnA9u6s",
  authDomain: "house-marketplace-app-47d17.firebaseapp.com",
  projectId: "house-marketplace-app-47d17",
  storageBucket: "house-marketplace-app-47d17.appspot.com",
  messagingSenderId: "528907580337",
  appId: "1:528907580337:web:0e64ceaef93aabc2604390",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
