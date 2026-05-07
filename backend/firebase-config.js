// firebase-config.js
// Firebase configuration provided by the user

const firebaseConfig = {
  apiKey: "AIzaSyD4rju7oHOMQWNlR7WLwn-btMHPDhPtHx0",
  authDomain: "amrit-portfolio-2deff.firebaseapp.com",
  projectId: "amrit-portfolio-2deff",
  storageBucket: "amrit-portfolio-2deff.firebasestorage.app",
  messagingSenderId: "671902975805",
  appId: "1:671902975805:web:ae61e37eb8bae411902754"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();
}
