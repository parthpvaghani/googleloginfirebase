import React, { Component } from "react";
import {auth,db} from './firebase'
import EventPost from './EventPost'
import * as firebase from "firebase";
class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            eventname:'',
            eventdate:'',
            desc:'',
            users:[]
        }
        this.handlelogin = this.handlelogin.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.handleregister = this.handleregister.bind(this)
        this.handlelogout = this.handlelogout.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this)
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

    handleAddEvent(e){
        e.preventDefault()
        
        //set data at given location ---SET METHOD
        // let addData = firebase.database().ref('/Users');
        // addData.set({
        //     EventName:this.state.eventname,
        //     EventDate:this.state.eventdate
        // })

        //Pushes newly data everytime at given location ---PUSH METHOD
        let EventRef = firebase.database().ref().child('Events');
        EventRef.push({
            EventName:this.state.eventname,
            EventDate:this.state.eventdate,
            EventDesc:this.state.desc
        })

    }

    handleDeleteEvent(e){
        e.preventDefault()

    }
    handleUpdateEvent(e){

        //update data at given location ---UPDATE METHOD
        // e.preventDefault()
        // let newlyAddedRef = firebase.database().ref('Users');
        // newlyAddedRef.update({
        //     EventName:this.state.eventname
        // })

        //Add transactional data(fetch+calculation+storeitback)
        //or simply updation
        // let eventRef = firebase.database.ref.child('Events')

    }

    componentDidMount = async () => {
        const snapshot  = await db.collection('users').get()
        const users  = snapshot.docs.map(doc=>{
           return{id:doc.id,user:doc.data()}
        })
        this.setState({users})
        console.log(this.state.users)
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
                {/* Events Form */}
                <br/><label>Event Name</label><br/>
                <input className="form-control" type="text" name="eventname" onChange={this.handlechange} value={this.state.eventname} /><br/>
                <label>Event Date</label><br/>
                <input className="form-control" type="text" name="eventdate" onChange={this.handlechange} value={this.state.eventdate}/><br/>
                <label>Event Description</label><br/>

                <input className="form-control" type="text" name="desc" onChange={this.handlechange} value={this.state.desc}/><br/>
                <button className="btn btn-primary" type="text" onClick={this.handleAddEvent}>AddEvent</button>
                <button className="btn btn-primary" type="text" onClick={this.handleDeleteEvent}>DeleteEvent</button>
                <button className="btn btn-primary" type="text" onClick={this.handleUpdateEvent}>UpdateEvent</button>
                <h2>All Events</h2>

                    <EventPost users={this.state.users}/>
              
                
                
              
              </form>
            </div>
          );
    }
  
}

export default Login
