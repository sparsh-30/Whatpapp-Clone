import React from 'react'
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import './App.css'

function App() {
  const name=prompt("Enter your name:");
  
  return (
      <div className='container'>
        <Sidebar />
        <Chat name={name} />
      </div>
  );
}

export default App;
