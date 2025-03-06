// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = import.meta.env.VITE_Firebase_API_KEY
const firebaseConfig = {
	apiKey: `${API_KEY}`,
	authDomain: "cm2020-101.firebaseapp.com",
	projectId: "cm2020-101",
	storageBucket: "cm2020-101.appspot.com",
	messagingSenderId: "214521337103",
	appId: "1:214521337103:web:b4a4b40b46360729a79a7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const timestamp = serverTimestamp();
const storage = getStorage(app);

export { db, auth, timestamp, storage };
