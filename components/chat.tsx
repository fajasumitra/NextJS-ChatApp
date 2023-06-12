'use client'
import React from 'react'
import { Socket } from 'socket.io-client';

interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}

export default function chat({socket, username, room}: ChatProps) {
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [messageList, setMessageList] = React.useState<Array<any>>([])
    
    const sendMessage = () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
            }
            socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
    }

    React.useEffect(()=> {
        socket.on('receive_message', (data) => {
            setMessageList((list)=>[...list, data])
        })
    }, [socket])
  return (
    <>
        <div className='mt-40'>
            <div>
                <p>Live Chat</p>
            </div>
            <div>
                {messageList.map((messageContent)=>{
                    return <div>
                        <div>
                            <p>{messageContent.message}</p>
                        </div>
                        <div>
                            <p>{messageContent.time}</p>
                            <p>{messageContent.author}</p>
                        </div>
                    </div>
                })}
            </div>
            <div id="chat-footer">
                <input type="text" placeholder="type a message" onChange={(event) =>{
                    setCurrentMessage(event.target.value)
                }}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </>
  )
}
