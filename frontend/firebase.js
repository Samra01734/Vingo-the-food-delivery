// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-4d63f.firebaseapp.com",
  projectId: "vingo-food-delivery-4d63f",
  storageBucket: "vingo-food-delivery-4d63f.firebasestorage.app",
  messagingSenderId: "818413955021",
  appId: "1:818413955021:web:06f92f683c9ef64be58684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}