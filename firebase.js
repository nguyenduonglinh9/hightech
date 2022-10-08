import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG2txTqYdSmlzqhsMo4MA4VrIjWqINALg",
  authDomain: "testapihightech.firebaseapp.com",
  projectId: "testapihightech",
  storageBucket: "testapihightech.appspot.com",
  messagingSenderId: "633947780297",
  appId: "1:633947780297:web:4026f9fb77dd177c53c918",
  measurementId: "G-481EC7R8HJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth()
const db = firebase.firestore()

export { auth };
export default db;