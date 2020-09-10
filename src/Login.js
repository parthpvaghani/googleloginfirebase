import React, { Component } from "react";
import {auth} from './firebase'
import * as firebase from "firebase";
class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.handlelogin = this.handlelogin.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.handleregister = this.handleregister.bind(this)

    }

    handlechange(event){
        this.setState({
            [event.target.name] : event.target.value
        },
        console.log(this.state)
        )
    }

    handlelogin(event){
    event.preventDefault();
       const provider =  new firebase.auth.GoogleAuthProvider();
       provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
       auth.signInWithPopup(provider)
       .then((result)=>{
            var token = result.credential.accessToken
            var user = result.user
       })
       .catch((error)=>{
            console.log(error.message)
       })
    }

    handleregister(event){
    event.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.username,this.state.password).catch((e)=>{
            console.log(e.message)
        })
    }

    render(){
        auth.onAuthStateChanged((user)=>{
                if(user){
                    console.log(user)
                }else{
                    console.log('usersignedout')
                }
        })
        return (
            <div>
              <form>
                <label>Username</label><br/>
                <input type="text" name="username" onChange={this.handlechange} value={this.state.username} /><br/>
                <label>Password</label><br/>
                <input type="password" name="password" onChange={this.handlechange} value={this.state.password}/><br/>
                <button type="submit" onClick={this.handlelogin}>Login</button>
                <button type="submit" onClick={this.handleregister}>Register</button>
                
              </form>
            </div>
          );
    }
  
}

export default Login
