import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk3WnviKIbRzxKCNjZoLY9CUdSBtOwnCI",
  authDomain: "fir-auth-app-22567.firebaseapp.com",
  projectId: "fir-auth-app-22567",
  storageBucket: "fir-auth-app-22567.firebasestorage.app",
  messagingSenderId: "983203434804",
  appId: "1:983203434804:web:b4ce85f5bc5910ab115561",
  measurementId: "G-0QXQZDPVEY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };