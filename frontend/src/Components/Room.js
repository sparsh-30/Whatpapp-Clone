import { Avatar } from '@mui/material'
import React from 'react'
import io from 'socket.io-client'
import './Room.css'

const socket=io("http://localhost:5000");

const Room = (props) => {

  const GetID=()=>{
    socket.emit('get-id',props.obj._id);
  }

  // const last_message=props.obj.room_messages.pop();
  // console.log(last_message);

  return (
    <div className='room-container' onClick={GetID}>
        <Avatar sx={{height:'55px',width:'55px'}} src={process.env.PUBLIC_URL + '/profile.png'} className='room-avatar' />
        <span className='span1'>{props.obj.room_name}</span><br />
        <span  className='span2'>Last Message</span>
    </div>
  )
}

export default Room