
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB_RL83GBiHQqhhFEF5SPKt3HlmUcO-UVs",
  authDomain: "proyecto-final-5ff38.firebaseapp.com",
  projectId: "proyecto-final-5ff38",
  storageBucket: "proyecto-final-5ff38.appspot.com",
  messagingSenderId: "900624574970",
  appId: "1:900624574970:web:5e7402f845038392a09c43"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 export {db, firebaseConfig};