// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMQksioODijOlbclBRl9k5-r0C99FnQ08",
    authDomain: "smart-deals-571ed.firebaseapp.com",
    projectId: "smart-deals-571ed",
    storageBucket: "smart-deals-571ed.firebasestorage.app",
    messagingSenderId: "548360108059",
    appId: "1:548360108059:web:5485a556c042392c4be0be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);