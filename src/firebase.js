import { initializeApp } from "firebase/app";
import { getAuth, browserSessionPersistence } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Dispatch } from "redux";
import { userLoggedIn } from "./redux/userSlice";
import { sendPasswordResetEmail } from "firebase/auth";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const firebaseConfig = {
  apiKey: "AIzaSyCHOddbvXPb8w9-VtVgI0iStfZgqmuQKnc",
  authDomain: "calendarboard-e84ef.firebaseapp.com",
  projectId: "calendarboard-e84ef",
  storageBucket: "calendarboard-e84ef.appspot.com",
  messagingSenderId: "781535264774",
  appId: "1:781535264774:web:299e78c42b8ecd349e8387",
  measurementId: "G-N8BGMQZ568",
  databaseURL: "https://calendarboard-e84ef-default-rtdb.firebaseio.com/",
  storageBucket: "gs://calendarboard-e84ef.appspot.com/"
};

export function logIn(email, password) {
  auth.setPersistence(browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password).then((res) => {
    console.log(`sign in using email and password user=${res.user}`)
    cookies.set('emailUser', res.user, { path: '/' });
    return {success: true, error: null}}).catch((error) => {
    if (email === '' || password === '') {
      return {
        success: false,
        error: "Please fill out both Email and Password"
      }
    }
    if (error.code === "auth/wrong-password") {
      return {
        success: false,
        error: "Email or Password is Incorrect"
      }
    }
    if (error.code === "auth/user-not-found") {
      return {
        success: false,
        error: "Email or Password is Incorrect"
      }
    }
    return {
      success: false,
      error: "could not login : " + error.message
    }
  });
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    return res; 
  }).catch((err) => {
    return { success: false, error: "could not signup : " + err.message }
  })
}

export function logOut() {
  return signOut(auth).catch((err) => {
    return { success: false, error: "could not logout : " + err.message }
  });
}

export const sendPasswordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email).catch((err) => {
    return { success: false, error: "could not " }
  })
}

export function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  auth.setPersistence(browserSessionPersistence);
  return signInWithPopup(auth, googleAuthProvider).then((res) => {
    return res;
  }).catch((err) => {
    return { success: false, error: "could not sign in with google : " + err.message }
  });
}

const app = initializeApp(firebaseConfig);
//const storage = getStorage(app);
export const auth = getAuth(app);
// firebase.setPersistence(auth, browserSessionPersistence);
// auth.setPersistence(browserSessionPersistence);
// const database 

export default app;