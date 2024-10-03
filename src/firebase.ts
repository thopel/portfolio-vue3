import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiP8Zm5f4CZ_4sgUPL5Rb4qW5L0yE4MgA",
  authDomain: "portfolio-d0ca8.firebaseapp.com",
  projectId: "portfolio-d0ca8",
  storageBucket: "portfolio-d0ca8.appspot.com",
  messagingSenderId: "443553158329",
  appId: "1:443553158329:web:76247e484bf4fd18823768",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase dont tu as besoin
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
