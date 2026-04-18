import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDRRCUcFnvnSgOXiEYs_mdwfsHMP-_9ti4",
  authDomain: "campus-connect-f1f29.firebaseapp.com",
  projectId: "campus-connect-f1f29",
  storageBucket: "campus-connect-f1f29.firebasestorage.app",
  messagingSenderId: "15818696545",
  appId: "1:15818696545:web:09b3687a3cd8330e1dc720",
};

// ✅ FIX: prevent duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const requestPermission = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.log("FCM not supported");
      return;
    }

    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Permission denied");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: "BJ11ge3GpeiwvzrlKJb7NIo-i3VNHgjdDJuH8xcT5gjty2r2qNFeNpD5kroszr6XDys1bmKKD2MFN0zjjCRLtCc", // 🔥 replace this
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);
  } catch (err) {
    console.error("FCM Error:", err);
  }
};