// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf0S-0jkHA2BpC86isbKVeFKlzYRDxol4",
  authDomain: "livento-ass-10.firebaseapp.com",
  projectId: "livento-ass-10",
  storageBucket: "livento-ass-10.firebasestorage.app",
  messagingSenderId: "202529423721",
  appId: "1:202529423721:web:ceb23770b6c0a9aeca3df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
 