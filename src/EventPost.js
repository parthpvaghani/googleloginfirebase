import React from 'react'

function EventPost(props) {
  return(
    props.events.map(event=>{
      return (
        <div key={event.id}>
           <div className="card bg-light mb-3">
                     <div Name="card-header">{event.event.EventName}</div>
                     <div className="card-body">
                       <h5 className="card-title">{event.event.EventDesc}</h5>
                       <p className="card-text">{event.event.EventDate}</p>
                       <button className="btn btn-primary" type="text" onClick={()=>{props.handleDeleteEvent(event.id)}}>DeleteEvent</button>
                       <button className="btn btn-primary" type="text" onClick={props.handleUpdateEvent}>UpdateEvent</button>
               
                     </div>
                </div>  
        </div>
      )
    })
  
  )
}
export default EventPost