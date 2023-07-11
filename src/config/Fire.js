import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {
  apiKey: "AIzaSyC2jyiW7c8cLV1mykvVv3DZvlYnQ7o5ULc",
  authDomain: "safari-kid-387711.firebaseapp.com",
  projectId: "safari-kid-387711",
  storageBucket: "safari-kid-387711.appspot.com",
  messagingSenderId: "656189295003",
  appId: "1:656189295003:web:a82d23f067d70fbb36793e",
  measurementId: "G-EFVB2LH26M"
};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();

export default fire;