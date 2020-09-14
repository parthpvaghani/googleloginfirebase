import React,{useState,useEffect} from "react";
import "./App.css";
import Login from './Login'
import LoginUi from './LoginUi'
import * as firebase from 'firebase'

function App() {

const [login,setlogin] = useState('false');
 useEffect(()=>
 {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('signedin')
      setlogin(true)
      // ...
    } else {
      // User is signed out.
      setlogin(false)
      // ...
    }
  })
},[])

return(
  <div>
  {(login)?<Login/>:<LoginUi/>}
  </div>
)
}

export default App;
