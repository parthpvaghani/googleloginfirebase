import React from 'react'

function EventPost(props) {
  return(
    props.users.map(user=>{
      return (
        <div>
           <div className="card bg-light mb-3">
                     <div Name="card-header">{user.user.first}</div>
                     <div className="card-body">
                       <h5 className="card-title">{user.user.first}</h5>
                       <p className="card-text">{user.user.first}</p>
                     </div>
                </div>  
        </div>
      )
    })
  
  )
}
export default EventPost