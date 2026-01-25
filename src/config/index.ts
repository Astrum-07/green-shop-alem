import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDPOxinTOHnKoyJhG1OSV2RUnrjJ1r8Ib8",
  authDomain: "green-shop-alem.firebaseapp.com",
  projectId: "green-shop-alem",
  storageBucket: "green-shop-alem.firebasestorage.app",
  messagingSenderId: "968801870222",
  appId: "1:968801870222:web:38f797844381673ac644df",
  measurementId: "G-91MJXZ66JQ"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};