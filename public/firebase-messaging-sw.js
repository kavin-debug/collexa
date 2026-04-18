/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDRRCUcFnvnSgOXiEYs_mdwfsHMP-_9ti4",
  authDomain: "campus-connect-f1f29.firebaseapp.com",
  projectId: "campus-connect-f1f29",
  storageBucket: "campus-connect-f1f29.firebasestorage.app",
  messagingSenderId: "15818696545",
  appId: "1:15818696545:web:09b3687a3cd8330e1dc720",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/pwa-192x192.png",
  });
});