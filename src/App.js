import "./App.css";
import SignIn from "./containers/login";
import SignUp from "./containers/signUp";
import Dashboard from "./containers/dashboard";
import { useState, useEffect } from "react";
import firebase from "firebase";

/**
 * Et hook der lytter på ændringer i authState/firebase og kalder callback,
 * med opdateret user eller null
 * @param {Callback er en function, der tager en user eller null} callback 
 */
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
/**
 * App root, holder styr på at vise de forskellige pages/components,
 * alt efter authState
 */
function App() {
  const [signUp, setsignUp] = useState(false);
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // Render when user is logged in
  if (user) {
    return <Dashboard />;
  } else {
  // Render when user is not logged in
    return (
      <div className="App">
        {signUp ? (
          <SignUp
            onSignInClicked={() => {
              setsignUp(false);
            }}
          />
        ) : (
          <SignIn
            onSignUpClicked={() => {
              setsignUp(true);
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
