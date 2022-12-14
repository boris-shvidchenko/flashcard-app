// Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZfkoYh5d1QZ_noFQDmB6AIIzUfz30uss",
    authDomain: "flashcard-app-c25c5.firebaseapp.com",
    projectId: "flashcard-app-c25c5",
    storageBucket: "flashcard-app-c25c5.appspot.com",
    messagingSenderId: "968687086119",
    appId: "1:968687086119:web:cfbf257630b033ba247c02"
};

// Initialize Firebase if not already initialized, otherwise use the already created app 
const app = initializeApp(firebaseConfig);

// Obtain the database, authentication, and provider
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

// Export for later use
export { db, auth, provider };