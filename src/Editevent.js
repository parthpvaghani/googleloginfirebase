import React from 'react'

function Editevent({id,event}) {
    return (
        <div>
            <div Name="card-header"><input className="form-control" type="text"  name="updatedeventname"  value={this.state.updatedeventname}/><br/>
              </div>
              <h5 className="card-title"><input className="form-control" type="text"  name="updateddesc" value={this.state.updateddesc} /><br/>
              </h5>
              <p className="card-text"><input className="form-control" type="text"  name="updatedeventdate" value={this.state.updatedeventdate} /><br/>
              </p>
              <button
              className="btn btn-primary"
              type="text"
              onClick={() => {
                
              }}
            >Save</button>
        </div>
    )
}


export default Editevent
