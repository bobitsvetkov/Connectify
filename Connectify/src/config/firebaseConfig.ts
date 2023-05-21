import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAPGia1tPS4LXgVC_fI_mpxHAkN_-1JD6c",
    authDomain: "connectify-7b76f.firebaseapp.com",
    databaseURL: "https://connectify-7b76f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "connectify-7b76f",
    storageBucket: "connectify-7b76f.appspot.com",
    messagingSenderId: "1054986592214",
    appId: "1:1054986592214:web:e4f49d60c3a9b0654a8e77",
    measurementId: "G-9FRX3VZV9R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);