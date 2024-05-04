import { initializeApp } from "firebase/app";

// getauth and googleAuthprovider
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBI_MbcuOeCsUFBbdw8Rb3WgUaAj2rfmks",
    authDomain: "sports-b01f3.firebaseapp.com",
    projectId: "sports-b01f3",
    storageBucket: "sports-b01f3.appspot.com",
    messagingSenderId: "673587633069",
    appId: "1:673587633069:web:b8ff60a302fb74818e9f24",
    measurementId: "G-D7H7Q6MYLZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };