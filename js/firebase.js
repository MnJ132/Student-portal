import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPODtSX-zzWlqhZtcuOovl_O7eZPE2we0",
  authDomain: "student-portal-8ebc2.firebaseapp.com",
  projectId: "student-portal-8ebc2",
  storageBucket: "student-portal-8ebc2.firebasestorage.app",
  messagingSenderId: "5259061990",
  appId: "1:5259061990:web:510862f2ea63bba2122927"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };