import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCtrV6VpQyizz9I4sQ2LQC_ExtEAGxWV00",
  authDomain: "coffee-guide-87189.firebaseapp.com",
  databaseURL: "https://coffee-guide-87189.firebaseio.com",
  projectId: "coffee-guide-87189",
  storageBucket: "",
  messagingSenderId: "799128446211",
  appId: "1:799128446211:web:e91b7b3254d8f6f0"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
