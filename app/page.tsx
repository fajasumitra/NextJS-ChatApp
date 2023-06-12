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
        <div className=''>
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder="room" onChange={(e) => setRoom(e.target.value)}/>
          <button onClick={joinRoom}>Join</button>
        </div>
            :
        <Chat socket={socket} username={username} room={room}/>
        }
    </>
  )
}