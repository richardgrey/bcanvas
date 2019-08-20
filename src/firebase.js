import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const fb = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
});

// Database
export const firestore = firebase.firestore();
firestore.settings({});

// Authorisation
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const EmailProvider = firebase.auth.EmailAuthProvider;
googleProvider.addScope('profile');
googleProvider.addScope('email');

export const { FieldValue, Timestamp } = firebase.firestore;
