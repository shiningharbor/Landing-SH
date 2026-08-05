import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBcwrCwTVHeQaWPhvMALZQJkUEhr3eMtOw",
    authDomain: "revolverx-50c19.firebaseapp.com",
    projectId: "revolverx-50c19",
    storageBucket: "revolverx-50c19.firebasestorage.app",
    messagingSenderId: "970224934694",
    appId: "1:970224934694:web:53d4a952415d963f40ebe7",
    measurementId: "G-GPDRYGD7DJ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;