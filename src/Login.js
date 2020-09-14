import React, { Component } from "react";
import {auth,db} from './firebase'
import EventPost from './EventPost'
import * as firebase from "firebase";
class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventname:'',
            eventdate:'',
            desc:'',
            events:[]
        }
        this.handlechange = this.handlechange.bind(this)
        this.handlelogout = this.handlelogout.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this)
    }

    handlechange(event){
        this.setState({
            [event.target.name] : event.target.value
        },
        )
    }

 

   
    

    handlelogout(e){
        e.preventDefault()
        auth.signOut().then()
        alert('signed Out')
    }

    handleAddEvent(e){
        e.preventDefault()
        
        db.collection('Events').add({
            EventName:this.state.eventname,
            EventDate:this.state.eventdate,
            EventDesc:this.state.desc
        })
    }

    handleDeleteEvent = (id) => {
        console.log('clciked')
        db.doc(`Events/${id}`).delete()
    }

    handleUpdateEvent(e){

    }

    componentDidMount = async () => {

        //realtime updates
        db.collection('Events').onSnapshot(snapshot=>{
            const events  = snapshot.docs.map(doc=>{
                return{id:doc.id,event:doc.data()}
             })

             this.setState({events})
             console.log(this.state.events)
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
            
            <div className="container">
              <form className="form-group">
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
             </form>
             <h2>All Events</h2>
              <EventPost events={this.state.events} handleDeleteEvent={this.handleDeleteEvent} handleUpdateEvent={this.handleUpdateEvent}/>

            </div>
          );
    }
  
}

export default Login
