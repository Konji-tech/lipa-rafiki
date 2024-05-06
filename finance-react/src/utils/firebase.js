// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBgy0yYrfIwatMEApF9fR9FRTY06luHISw",
	authDomain: "test-1a1f2.firebaseapp.com",
	projectId: "test-1a1f2",
	storageBucket: "test-1a1f2.appspot.com",
	messagingSenderId: "385087268234",
	appId: "1:385087268234:web:ed267ada448fb60eb21473",
	measurementId: "G-859R3NG21T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
