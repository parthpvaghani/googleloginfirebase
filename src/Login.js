import React, { Component } from "react";
import {auth,db} from './firebase'
import EventPost from './EventPost'
import * as firebase from "firebase";
class Login extends Component {

    //to unsubscribe the updates from database
    unsubscribe = null;

    constructor(props){
        super(props);
        this.state = {
            eventname:'',
            eventdate:'',
            desc:'',
            events:[],
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
        db.doc(`Events/${id}`).delete()
    }

    handleUpdateEvent(e){
        e.preventDefault()
        this.setState({
            update:!this.state.update
        })
    }

    componentDidMount = async () => {

        //realtime updates
        this.unsubscribe = db.collection('Events').onSnapshot(snapshot=>{
            const events  = snapshot.docs.map(doc=>{
                return{id:doc.id,event:doc.data()}
             })

             this.setState({events})
             console.log(this.state.events)
        })
      
       
    }

    componentWillUnmount(){
        this.unsubscribe()
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
            <>
            <div className="container">
              <form className="form-group">
                  <div className="d-flex justify-content-end">
              <button className="btn btn-danger " type="submit" onClick={this.handlelogout}>LogOut</button>
              </div>
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
             <div className="events">
             <EventPost events={this.state.events} handlechange={this.handlechange} handleDeleteEvent={this.handleDeleteEvent} handleUpdateEvent={this.handleUpdateEvent}  update={this.state.update}/>
            </div>
            </div>
            </>
          );
    }
  
}

export default Login
