// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // getAuth importu eklenmeli
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABeolP0_is9yj_yXTqAF48PKUV-L1MVOE",
  authDomain: "to-do-list-7b4c1.firebaseapp.com",
  projectId: "to-do-list-7b4c1",
  storageBucket: "to-do-list-7b4c1.firebasestorage.app",
  messagingSenderId: "746523177000",
  appId: "1:746523177000:web:da8d86a8fe2fb421a5051d",
  measurementId: "G-S463EYF05J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); //todo: kontrol
export { auth, db };

