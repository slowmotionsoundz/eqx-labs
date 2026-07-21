import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGvP9YPajbjdj5MlB2FfWQQkyDBGJTlZQ",
  authDomain: "eqxxx-crm.firebaseapp.com",
  projectId: "eqxxx-crm",
  storageBucket: "eqxxx-crm.firebasestorage.app",
  messagingSenderId: "236861439951",
  appId: "1:236861439951:web:2026f1da4ac4203e499cba"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Simple sync utility to overwrite a document
export async function saveToFirestore(collectionName, id, data) {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

export async function deleteFromFirestore(collectionName, id) {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}
