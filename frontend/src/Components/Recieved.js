import React from 'react'
import './Messages.css'

const Recieved = (props) => {
  return (
    <div>
        <p className="message">
            <span className="name">{props.name}</span>
            {props.msg}
            {/* <span className="timestamp">{new Date().toUTCString()}</span> */}
            <span className="timestamp">"Demo Timestamp"</span>
        </p>
    </div>
  )
}

export default Recieved