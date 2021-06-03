importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

var firebaseConfig = {
	apiKey: "AIzaSyBWcHL9f89_ORO15vqm0WzW4SHRl0WYtak",
	authDomain: "karthikganeshram-in.firebaseapp.com",
	projectId: "karthikganeshram-in",
	storageBucket: "karthikganeshram-in.appspot.com",
	messagingSenderId: "329859626245",
	appId: "1:329859626245:web:1b509b008419b2653ff36c",
	measurementId: "G-E1FG0Z88FY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
