import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import Room from './Room';
import axios from 'axios'


const Sidebar = (props) => {
  const [rooms,setRooms]=useState([]);


  useEffect(()=>{
    fetch("http://localhost:5000/find/room")
    .then((res)=> res.json())
    .then((result)=>{
      setRooms(result);
    })
  },[rooms])

  const Add=()=>{
    const temp=prompt("Enter name of the room:");
    axios.post("http://localhost:5000/new/room",{
      room_name:temp,
      room_messages:[]
    })
  }

  return (
    <div className='sidebar'>
      {/* Navbar */}
      <div className="navbar">
        <Avatar sx={{height:'55px',width:'55px'}} src={process.env.PUBLIC_URL + '/cat.webp'} />
        {/* <h1>User</h1> */}
        <div>
            <IconButton><DonutLargeIcon className='icons' /></IconButton>
            <IconButton><ChatIcon className='icons' /></IconButton>
            <IconButton><MoreVertIcon className='icons' /></IconButton>
          </div>
      </div>

      {/* Search */}
      <div className="search">
        <SearchIcon />
        <input type="text" placeholder='Search or start new chat' />
      </div>

      {/* Chat Room */}
      <div className='chat-room'>
        <h2 onClick={Add}>Add New Chat</h2>
          {/* <Room />
          <Room />
          <Room /> */}
          {
            rooms.map(room => {
              return <Room key={room._id} RoomID={props.RoomID} obj={room} />
            })
          }
      </div>

    </div>
  )
}

export default Sidebar