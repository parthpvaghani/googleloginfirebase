import React, { useState } from "react";
import { db } from "./firebase";
class EventPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedeventname: "",
      updatedeventdate: "",
      updateddesc: "",
      updateid:'',
    };
  }

  handlechange = (event) => {
    console.log("handlechange");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlesave =  (id) => {
    db.collection('Events').doc(`${id}`).update({
      EventName:this.state.updatedeventname,
      EventDate:this.state.updatedeventdate,
      EventDesc:this.state.updateddesc
    })

    this.setState({
      updateid:''
    })
  };

 

  handleUpdate = (id) => {
    console.log(id)
    this.setState({
      updateid:id
    })
  };

  render() {
    return this.props.events.map((event, index) => {
      return (
        <div key={event.id}>
          <div className="card bg-light mb-3">
            <div className="card-body">
              {(event.id!==this.state.updateid) ? (
                <>
                  <label>Event Name:</label>
                  <h3 Name="card-header">{event.event.EventName}</h3>
                  <label>Event Description:</label>
                  <h5 className="card-title">{event.event.EventDesc}</h5>
                  <label>Event Date:</label>
                  <p className="card-text">{event.event.EventDate}</p>

                  <button
                    className="btn btn-primary"
                    type="text"
                    onClick={() => {
                      this.props.handleDeleteEvent(event.id);
                    }}
                  >
                    DeleteEvent
                  </button>
                  <button
                    className="btn btn-primary"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#EditEvent"
                    type="text"
                    onClick={() => this.handleUpdate(event.id)}
                  >
                    UpdateEvent
                  </button>
                </>
              ) : (
                <>
                  <div Name="card-header">
                    <label>Event Name</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handlechange}
                      name="updatedeventname"
                      value={this.state.updatedeventname}
                      
                    />
                    <br />
                  </div>
                  <p className="card-title">
                  <label>Event Description</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handlechange}
                      name="updateddesc"
                      value={this.state.updateddesc}
                    />
                    <br />
                  </p>
                  <p className="card-text">
                  <label>Event Date</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handlechange}
                      name="updatedeventdate"
                      value={this.state.updatedeventdate}
                    />
                    <br />
                  </p>
                  <button
                    className="btn btn-primary"
                    type="text"
                    onClick={() => {
                      this.handlesave(event.id);
                    }}
                  >
                    Save
                  </button>

            
                </>
              )}
            </div>
          </div>
        </div>
      );
    });
  }
}
export default EventPost;
