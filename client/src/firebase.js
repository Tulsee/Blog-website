// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-47e07.firebaseapp.com",
  projectId: "mern-blog-47e07",
  storageBucket: "mern-blog-47e07.appspot.com",
  messagingSenderId: "266721089925",
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
