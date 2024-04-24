// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-IO4ihRaueylS6OozlKgJkMpfw8sYK5g",
  authDomain: "metube-ff0f8.firebaseapp.com",
  projectId: "metube-ff0f8",
  storageBucket: "metube-ff0f8.appspot.com",
  messagingSenderId: "133912459047",
  appId: "1:133912459047:web:fe6958fbee8950371adb02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider= new GoogleAuthProvider();

export default app;