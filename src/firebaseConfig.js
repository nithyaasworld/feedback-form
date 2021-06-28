import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Your config code goes here.
const config = {
    apiKey: "AIzaSyDenN5qfEl3UTGODaITwSw90uLYK6Y3rMo",
    authDomain: "trip-planner-1a249.firebaseapp.com",
    projectId: "trip-planner-1a249",
    storageBucket: "trip-planner-1a249.appspot.com",
    messagingSenderId: "535109392798",
    appId: "1:535109392798:web:7b709037427961a505de8f"
};
firebase.initializeApp(config);
export const databaseRef = firebase.firestore();
export const firebaseAuth = firebase.auth();