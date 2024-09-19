// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ8dY3zSgqB8u_yMA-Mi4HTf0pyNrnmUE",
  authDomain: "buysell-number-verification.firebaseapp.com",
  projectId: "buysell-number-verification",
  storageBucket: "buysell-number-verification.appspot.com",
  messagingSenderId: "231216012610",
  appId: "1:231216012610:web:78d39fad75339f0f7f3cdb"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export {app, auth} 