import "./App.css";
import SignIn from "./containers/login";
import SignUp from "./containers/signUp";
import { useState, useEffect } from "react";
import firebase from 'firebase';

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

function App() {
  const [signUp, setsignUp] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);
    if (user) {
     return <div> You are logged in, shitter
    </div>
    } else {
      return <div className="App"> {signUp ? <SignUp onSignInClicked={() => {setsignUp(false)}} /> : <SignIn onSignUpClicked={ () => {setsignUp(true)}} />}</div> 
    }
}
  



export default App;
