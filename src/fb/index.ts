import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCExJmdetITNVEBGVN0CT-EuvWs-Dcwt74",
  authDomain: "m4u-app-1b888.firebaseapp.com",
  projectId: "m4u-app-1b888",
  storageBucket: "m4u-app-1b888.appspot.com",
  messagingSenderId: "58040063263",
  appId: "1:58040063263:web:3ff447a5098b1883e7cc2a",
  measurementId: "G-5E8D79MS3E",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
