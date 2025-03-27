// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIKEvY44pkD9lcrMWpHH6k-D_emuDmphg",
  authDomain: "clone-783ac.firebaseapp.com",
  projectId: "clone-783ac",
  storageBucket: "clone-783ac.appspot.com",
  messagingSenderId: "979786100303",
  appId: "1:979786100303:web:c6e24c8493a1843627843a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
