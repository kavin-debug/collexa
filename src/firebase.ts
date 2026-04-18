import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRRCUcFnvnSgOXiEYs_mdwfsHMP-_9ti4",
  authDomain: "campus-connect-f1f29.firebaseapp.com",
  projectId: "campus-connect-f1f29",
  storageBucket: "campus-connect-f1f29.firebasestorage.app",
  messagingSenderId: "15818696545",
  appId: "1:15818696545:web:09b3687a3cd8330e1dc720",
  measurementId: "G-MFTTFQP953",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
