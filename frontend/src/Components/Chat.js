import React,{ useState, useRef, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import Recieved from './Recieved';
import Sent from './Sent';
import io from 'socket.io-client'
import axios from 'axios'

const socket=io("http://localhost:5000");

const Chat = (props) => {
  const [send,setSend]=useState("");
  const [messages,setMessages]=useState([]);
  const [roomID,setRoomID]=useState("");
  const clearMessage=useRef(null);
  
  socket.on('send-to-chat',(id)=>{
    setRoomID(id);
  })

  useEffect(()=>{
    axios.get(`http://localhost:5000/find/room/${roomID}`)
    .then(result =>{
      setMessages(result.data);
    })
  },[roomID,messages])
  
  const SendMessage=(e)=>{
    if(e.key==="Enter"){
      const obj={
        id:roomID,
        msg:{
          sender:props.name,
          message:send,
          timestamp:"demo timestamp",
          recieved:false
        }
      }
      clearMessage.current.value="";
      socket.emit('send-message',obj);
      socket.on('update-messages',(demo)=>{
        setMessages(demo.chats);
      })
    }
  }

  
  const Type=async (e)=>{
    setSend(e.target.value);
  }
  return (
    <div className='chat'>

        {/* Chat Navbar */}
        <div className="chat-navbar">
          <div className='profile-div'>
            <Avatar src={process.env.PUBLIC_URL + '/cat.webp'} sx={{height:'55px',width:'55px'}} />
            <div>
            <span className="chat-span1">Demo Room</span><br />
            <span className="chat-span2">Last Seen {new Date().toUTCString()}</span>
            </div>
          </div>
          <div>
            <IconButton><SearchIcon className='icons' /></IconButton>
            <IconButton><AttachFileIcon className='icons' /></IconButton>
            <IconButton><MoreVertIcon className='icons' /></IconButton>
          </div>
        </div>

        {/* Chat Messages */}
        {/* <div className="messages-container">
          {props.chat ? props.chat.map((m)=>{
            return m.recieved===true ? <Recieved name={m.name} msg={m.message} time={m.timestamp} /> : <Sent name={m.name} msg={m.message} time={m.timestamp} />;
          }) : ""}
        </div> */}
        <div className='messages-container'>
          {
            messages ? messages.map((m)=>{
              return m.sender===props.name ? <Sent key={m._id} name={m.sender} msg={m.message} /> :
              <Recieved key={m._id} name={m.sender} msg={m.message} />
            }) : ""
          }
        </div>
        

        {/* Chat Footer */}
        <div className="footer">
        <IconButton><SentimentSatisfiedAltIcon /></IconButton>
        <input id='inp' type="text" placeholder='Type a message' onChange={Type} onKeyDown={SendMessage} ref={clearMessage} />
        <IconButton><MicIcon /></IconButton>
        </div>

    </div>
  )
}

export default Chat