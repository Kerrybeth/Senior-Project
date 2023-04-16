import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, browserLocalPersistence, setPersistence, browserSessionPersistence } from 'firebase/auth'
import * as firebase from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,

} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHOddbvXPb8w9-VtVgI0iStfZgqmuQKnc",
  authDomain: "calendarboard-e84ef.firebaseapp.com",
  projectId: "calendarboard-e84ef",
  storageBucket: "calendarboard-e84ef.appspot.com",
  messagingSenderId: "781535264774",
  appId: "1:781535264774:web:299e78c42b8ecd349e8387",
  measurementId: "G-N8BGMQZ568",
  databaseURL: "https://calendarboard-e84ef-default-rtdb.firebaseio.com/"
};

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((res) => {

  }).catch((err) => {
    return { success: false, error: "could not login : " + err.message }
  })
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    
  }).catch((err) => {
    return { success: false, error: "could not login : " + err.message }
  })
}

export function logOut() {
  return signOut(auth);
}

export function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider).then((res) => {

  }).catch((err) => {
    return { success: false, error: "could not sign in with google : " + err.message }
  });
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
firebase.setPersistence(auth, browserSessionPersistence);
const database = getDatabase(app);

export default app;