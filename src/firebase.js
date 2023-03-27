import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";


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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.setPersistence('local');
const database = getDatabase(app);
export default app;