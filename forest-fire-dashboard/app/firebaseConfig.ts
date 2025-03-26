// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ215nTIu5vDfouLR4HMagR5g5g1gBQ",
  authDomain: "flare-cade7.firebaseapp.com",
  databaseURL: "https://flare-cade7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flare-cade7",
  storageBucket: "flare-cade7.appspot.com", // ✅ Fixed typo
  messagingSenderId: "669669744684",
  appId: "1:669669744684:web:bded5f9b273e6c67b93189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database & Storage
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;
