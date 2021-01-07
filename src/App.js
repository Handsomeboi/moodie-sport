import "./App.css";
import SignIn from "./containers/login";
import SignUp from "./containers/signUp";
import { useState } from "react";

function App() {
  const [signUp, setsignUp] = useState(false);

  return <div className="App"> {signUp ? <SignUp onSignInClicked={() => {setsignUp(false)}} /> : <SignIn onSignUpClicked={ () => {setsignUp(true)}} />}</div>;
  
}

export default App;
