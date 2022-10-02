import React from 'react'
import './Messages.css'

const Sent = (props) => {
  return (
    <div>
        <p className="message sent">
            <span className="name">{props.name}</span>
            {props.msg}
            <span className="timestamp">{new Date().toUTCString()}</span>
        </p>
    </div>
  )
}

export default Sent