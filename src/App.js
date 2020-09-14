import React from "react";
import "./App.css";
import Login from './Login'
import LoginUi from './LoginUi'
import * as firebase from 'firebase'



function App() {
  // const Authorized = () => {
  //   console.log('function authorized called')
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       console.log('signedin')
  //       return (
  //         (<Login />)
  //       )
  //       // ...
  //     } else {
  //       // User is signed out.
  //       console.log('signedout')

  //       return (<LoginUi />)
  //       // ...
  //     }
  //   });
  // }
  return (
    <div className="App">
        <hr/>
        <Login/>
        <hr/>
    </div>
  );
}

export default App;
