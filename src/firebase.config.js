import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFF-GU5IQceJq51nW2s8R2934BeKzGesQ",
  authDomain: "house-marketplace-app-22572.firebaseapp.com",
  projectId: "house-marketplace-app-22572",
  storageBucket: "house-marketplace-app-22572.appspot.com",
  messagingSenderId: "173098247501",
  appId: "1:173098247501:web:0950c0605015ac358d0304",
  measurementId: "G-J6BX762H6W"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
