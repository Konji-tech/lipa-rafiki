// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBvkkPvqgtEDDlPI9jvloMOw_vHTdHiRcw",
	authDomain: "mpesa-react.firebaseapp.com",
	projectId: "mpesa-react",
	storageBucket: "mpesa-react.appspot.com",
	messagingSenderId: "405971368228",
	appId: "1:405971368228:web:fcdc7dd2f1324012239bb1",
	measurementId: "G-X6GBH1WP11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
