import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvjan12RPRnBieahmgLHQgbBKPoFceHkM",
  authDomain: "my-memories-a3bf0.firebaseapp.com",
  projectId: "my-memories-a3bf0",
  storageBucket: "my-memories-a3bf0.appspot.com",
  messagingSenderId: "873135300419",
  appId: "1:873135300419:web:177b74cba9a966c02f19f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const postsCollection = db.collection("posts");
const postsCollection = collection(db, "posts");

export {
  auth,
  db,
  storage,
  firebaseConfig,
  postsCollection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  uploadBytes,
  ref,
  doc,
};
