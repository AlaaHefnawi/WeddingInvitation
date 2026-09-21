import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByC2mNpGt4Xi9GqoQcAk0VsPvPgsHSb9U",
  authDomain: "rafah-and-moaz-wedding.firebaseapp.com",
  projectId: "rafah-and-moaz-wedding",
  storageBucket: "rafah-and-moaz-wedding.firebasestorage.app",
  messagingSenderId: "714117840826",
  appId: "1:714117840826:web:2bfe3faa76f43c474a2783",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);