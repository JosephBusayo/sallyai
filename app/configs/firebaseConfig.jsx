// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: (process.env.NEXT_PUBLIC_FIRESBASE_API_KEY),
  authDomain: "airbnbclone-app.firebaseapp.com",
  projectId: "airbnbclone-app",
  storageBucket: "airbnbclone-app.firebasestorage.app",
  messagingSenderId: "157600123912",
  appId: "1:157600123912:web:bdb84a4655b8e0c2bed5bd",
  measurementId: "G-BJ4Q2SKY4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)