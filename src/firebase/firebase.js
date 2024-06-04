import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYh9SXJnVJVfViEAVkeufjH2q3CWnY83w",
    authDomain: "tvsync-c8452.firebaseapp.com",
    projectId: "tvsync-c8452",
    storageBucket: "tvsync-c8452.appspot.com",
    messagingSenderId: "209174688748",
    appId: "1:209174688748:web:7679ee4f54df611fb686c9",
    measurementId: "G-S1JDB49L0Y"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);