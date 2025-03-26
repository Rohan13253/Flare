import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

// Function to upload a file to Firebase Storage
export const uploadFile = async (file: File, folderPath: string) => {
  const storageRef = ref(storage, `${folderPath}/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("File uploaded:", snapshot.metadata.fullPath);

    // Get file URL after upload
    const url = await getDownloadURL(storageRef);
    console.log("File URL:", url);
    return url;
  } catch (error) {
    console.error("File upload error:", error);
    return null;
  }
};
