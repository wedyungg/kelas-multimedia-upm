import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4Y5sdte0M2Mp8xmlyIVsEc6tpEF3Ki3o",
  authDomain: "kelas-multimedia-upm.firebaseapp.com",
  projectId: "kelas-multimedia-upm",
  storageBucket: "kelas-multimedia-upm.firebasestorage.app",
  messagingSenderId: "930908733092",
  appId: "1:930908733092:web:457236275095d89ac43031",
  measurementId: "G-9XZ824MZQM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
