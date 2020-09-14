import React, { Component } from "react";
import {auth,db} from './firebase'
import * as firebase from "firebase";
class LoginUi extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
        this.handlelogin = this.handlelogin.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.handleregister = this.handleregister.bind(this)
        this.handlelogout = this.handlelogout.bind(this)
    }

    handlechange(event){
        this.setState({
            [event.target.name] : event.target.value
        },
        )
    }

    handlegooglelogin(event){
    event.preventDefault();
       const provider =  new firebase.auth.GoogleAuthProvider();
       provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
       auth.signInWithPopup(provider)
       .then((result)=>{
            var token = result.credential.accessToken
            var user = result
            alert('loggedIn',token,user)
       })
       .catch((error)=>{
            console.log(error.message)
       })
    }

    handlelogin(event){
        event.preventDefault();
           auth.signInWithEmailAndPassword(this.state.username,this.state.password)
           .then((result)=>{
                alert('loggedIn')
           })
           .catch((error)=>{
                alert(error.message)
           })
           alert('successfully registered')
        }

    handleregister(event){
    event.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.username,this.state.password)
    .then(result=>{
        alert('registered successfully')
    })
    .catch((e)=>{
            alert(e.message)
        })
    }

    handlelogout(e){
        e.preventDefault()
        auth.signOut().then()
        alert('signed Out')
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
            
            <div className="container">
              <form className="form-group">
                <label className="mt-10">Username</label><br/>
                <input className="form-control" type="text" name="username" onChange={this.handlechange} value={this.state.username} /><br/>
                <label>Password</label><br/>
                <input className="form-control" type="password" name="password" onChange={this.handlechange} value={this.state.password}/><br/>
                <button className="btn btn-danger"type="submit" onClick={this.handlegooglelogin}>Google_Login</button>
                <button className="btn btn-danger" type="submit" onClick={this.handlelogin}>Login</button>
                <button className="btn btn-primary" type="submit" onClick={this.handleregister}>Register</button>
                <button className="btn btn-primary" type="submit" onClick={this.handlelogout}>LogOut</button>
              <hr/>
              </form>
            </div>
          );
    }
  
}

export default LoginUi
