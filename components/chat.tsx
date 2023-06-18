'use client'
import React from 'react'
import { Socket } from 'socket.io-client';
import clsx from 'clsx';
import axios from 'axios';

interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}

export default function chat({socket, username, room}: ChatProps) {
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [messageList, setMessageList] = React.useState<Array<any>>([])

    React.useEffect(() => {
        axios
            .get(`http://localhost:3001/api/messages/${room}`)
            .then((res) => {
                setMessageList(res.data)
            }
        )
        .catch((err) => {
            console.log(err)
        }
        )
    }, [room])
    
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
        <div className=''>
            <div className='p-5 border-2 grid gap-5 w-full'>
                <h1 className='text-2xl font-bold text-center'>Live Chat</h1>
                {/* <div className='h-80'> */}
                {messageList.map((messageContent)=>{
                    return (
                        <>
                        <div className='grid'>
                            <div className={clsx(
                                'py-1 px-2 rounded text-white w-fit h-fit text-lg',
                                messageContent.author === username 
                                ? 
                                'bg-green-600 justify-self-end'
                                :
                                'bg-blue-400'

                            )}>
                                <div>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='flex text-sm'>
                                    <p>{messageContent.time}</p>
                                    <p className='mx-2'>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}
                {/* </div> */}
                <div className='w-full'>
                        <input type="text" placeholder="type a message" onChange={(event) =>{
                            setCurrentMessage(event.target.value) 
                        }} className='border-gray-400 border py-1 px-2 rounded w-full'/>
                        <button onClick={sendMessage} className='rounded bg-blue-600 text-white px-2 py-1 w-full mt-3'>Send</button>
                </div>
            </div>
        </div>
    </>
  )
}
