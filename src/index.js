import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebase = require("firebase");
require("firebase/firestore");


  var firebaseConfig = {
    apiKey: "AIzaSyBf3xZHWL86o9-VE4540an4p_EQ4RSQYvk",
    authDomain: "moodie-sport.firebaseapp.com",
    projectId: "moodie-sport",
    storageBucket: "moodie-sport.appspot.com",
    messagingSenderId: "338240277038",
    appId: "1:338240277038:web:f11e339afcc1e426fb6dbf"
  };
  
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
