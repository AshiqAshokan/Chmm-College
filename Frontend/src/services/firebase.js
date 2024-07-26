// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCrnSb0nD1c_30tR1Y5hUxLj4ol5S9rsfA",
    authDomain: "video-cfc8b.firebaseapp.com",
    projectId: "video-cfc8b",
    storageBucket: "video-cfc8b.appspot.com",
    messagingSenderId: "195151365109",
    appId: "1:195151365109:web:6e1a47a3e72f2cca5116bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
