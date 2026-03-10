import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvmFR2Gs2FHShfwBx3wOI0Dt6HrLpOUXo",
  authDomain: "campus-connect-f1f29.firebaseapp.com",
  projectId: "campus-connect-f1f29",
  storageBucket: "campus-connect-f1f29.firebasestorage.app",
  messagingSenderId: "15818696545",
  appId: "1:15818696545:web:09b3687a3cd8330e1dc720",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
