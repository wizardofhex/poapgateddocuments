import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/functions'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA4gV-fI_KgsRE8CgcLp9apTq2cWeeCx6k",
  authDomain: "mintlit-5948b.firebaseapp.com",
  projectId: "mintlit-5948b",
  storageBucket: "mintlit-5948b.appspot.com",
  messagingSenderId: "423313865744",
  appId: "1:423313865744:web:1005c42279a938af945e95",
  measurementId: "G-Z4JHMH3Q5G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
