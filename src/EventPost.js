import React, { useState } from "react";
class EventPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedeventname: "",
      updatedeventdate: "",
      updateddesc: "",
    };
  }

  handlechange = (event) => {
    console.log("handlechange");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlesave = (id) => {
    
    console.log("new handle save unique id event wise", id);
  };

  handleUpdate = (id) => {
    console.log("new unique id event wise", id);
  };

  render() {
    return this.props.events.map((event, index) => {
      return (
        <div key={event.id}>
          <div className="card bg-light mb-3">
            <div className="card-body">
              {true ? (
                <>
                  <div Name="card-header">{event.event.EventName}</div>
                  <h5 className="card-title">{event.event.EventDesc}</h5>
                  <p className="card-text">{event.event.EventDate}</p>
                  <p className="card-text">{event.id}</p>
                  <p className="card-text">{index}</p>

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
                  {/* Modal -- start */}
                  <div
                    class="modal fade"
                    id="EditEvent"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Modal {event.id}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <label>Event Name</label>
                          <input
                            className="form-control"
                            type="text"
                            name="updatedeventname"
                            onChange={this.handlechange}
                            value={this.state.updatedeventname}
                          />
                          <label>Event desc</label>
                          <input
                            className="form-control"
                            type="text"
                            name="updateddesc"
                            onChange={this.handlechange}
                            value={this.state.updateddesc}
                          />
                          <label>Event date</label>
                          <input
                            className="form-control"
                            type="text"
                            name="updatedeventdate"
                            onChange={this.handlechange}
                            value={this.state.updatedeventdate}
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={()=> this.handlesave(event)}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Modal -- end */}
                </>
              ) : (
                <>
                  <div Name="card-header">
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handlechange}
                      name="updatedeventname"
                      value={this.state.updatedeventname}
                    />
                    <br />
                  </div>
                  <h5 className="card-title">
                    <input
                      className="form-control"
                      type="text"
                      onChange={this.handlechange}
                      name="updateddesc"
                      value={this.state.updateddesc}
                    />
                    <br />
                  </h5>
                  <p className="card-text">
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
                      this.props.handlesave(event.id);
                    }}
                    // onClick={}
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
