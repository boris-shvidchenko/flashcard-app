// Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuH_EmfmqVW9dnnU8TzUyjKIN8EURUTOo",
    authDomain: "flashcards-5e43e.firebaseapp.com",
    projectId: "flashcards-5e43e",
    storageBucket: "flashcards-5e43e.appspot.com",
    messagingSenderId: "346293108095",
    appId: "1:346293108095:web:b35781ccc79fb33ff16e4a"
  };

// Initialize Firebase if not already initialized, otherwise use the already created app 
const app = initializeApp(firebaseConfig);

// Obtain the database, authentication and provider
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

// Export for later use
export { db, auth, provider };