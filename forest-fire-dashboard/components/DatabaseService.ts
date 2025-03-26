import { ref, set, get, child } from "firebase/database";
import { database } from "../firebaseConfig";

// Function to write data to Firebase
export const writeData = async (path: string, data: any) => {
  try {
    await set(ref(database, path), data);
    console.log("Data written successfully!");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

// Function to read data from Firebase
export const readData = async (path: string) => {
  try {
    const snapshot = await get(child(ref(database), path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
};
