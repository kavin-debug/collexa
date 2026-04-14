// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRRCUcFnvnSgOXiEYs_mdwfsHMP-_9ti4",
  authDomain: "campus-connect-f1f29.firebaseapp.com",
  projectId: "campus-connect-f1f29",
  storageBucket: "campus-connect-f1f29.firebasestorage.app",
  messagingSenderId: "15818696545",
  appId: "1:15818696545:web:09b3687a3cd8330e1dc720",
  measurementId: "G-MFTTFQP953"
};

// Initialize Firebase ONLY ONCE
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export everything properly
export { app, analytics };
export const db = getFirestore(app);
export const auth = getAuth(app);