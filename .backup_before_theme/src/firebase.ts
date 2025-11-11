// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAArqbUU2BQz2GLI1Pj-1Z9ntUNzwDESFs",
  authDomain: "brototype-73965.firebaseapp.com",
  projectId: "brototype-73965",
  storageBucket: "brototype-73965.firebasestorage.app",
  messagingSenderId: "913109044837",
  appId: "1:913109044837:web:9757ba488bdcb86d29808c",
  measurementId: "G-W0ZER70FJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { analytics };
export default app;
