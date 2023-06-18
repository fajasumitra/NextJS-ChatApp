'use client'
import React, {useState} from 'react'
import {io} from 'socket.io-client'
import Chat from '../components/chat'

const socket = io('http://localhost:3001')

export default function page() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = ()=> {
    socket.emit('join_room', room)
    setShowChat(true)
  }
  return (
  <>
      {!showChat ?
      <div className='grid w-40 h-screen mx-auto content-center justify-items-center'>
        <div className='p-5 border-2 grid justify-center gap-5'>

          <h1 className='text-2xl font-bold text-center'>Join a Chat</h1>

          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className='border-gray-400 border py-1 px-2 rounded'/>

          <input type="text" placeholder="room" onChange={(e) => setRoom(e.target.value)} className='border-gray-400 border py-1 px-2 rounded'/>
          
          <button onClick={joinRoom} className='rounded bg-blue-600 text-white px-2 py-1'>Join</button>
        </div>
      </div>
          :
      <Chat socket={socket} username={username} room={room}/>  
      }
  </>
      
    )
  }

