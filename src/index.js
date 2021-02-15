import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA2FfVRXKD6KleS2Z_IIM4PgAq2gP6B9hQ",
  authDomain: "cart-89d52.firebaseapp.com",
  projectId: "cart-89d52",
  storageBucket: "cart-89d52.appspot.com",
  messagingSenderId: "724764342958",
  appId: "1:724764342958:web:447dace827ae168a1f0b3f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

