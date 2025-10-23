import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrKoh20iHAFqnLKPxvu3mtC1sZzbIfOEI",
    authDomain: "deposito-vitoria.firebaseapp.com",
    projectId: "deposito-vitoria",
    storageBucket: "deposito-vitoria.firebasestorage.app",
    messagingSenderId: "416473915359",
    appId: "1:416473915359:web:6deb882f99e6520e9fae6a",
    measurementId: "G-BBN9D9W237",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, analytics, auth };
