//WebSocet

import React, {useEffect, useState, useRef} from 'react';
import  axios  from 'axios';

function WebSocet(){

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    //const url = 'ws://first-test-chat-websocket.herokuapp.com'
    const url = 'ws://localhost:5000';
    //const url = 'https://first-test-chat-long-pulling.herokuapp.com'

    useEffect(() => {
         
    }, [])

    function connect(){
        socket.current = new WebSocket(url);
        socket.current.onopen = () =>{
            setConnected(true);
            const message = {
                id : Date.now(),
                event : "conection",
                username   
            }
            socket.current.send(JSON.stringify(message));
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }

    }

    const sendMessage = async () => {

        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('');
    }

 

    if(!connected){
        return (
            <>
                <h2>Представтесь</h2>
                <div className="form">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <button onClick={connect}>Отправить</button>
                </div>
            </>
        )
    }
    return (
        <>
            <h2>{username} в чате</h2>
            <div className="form">
                <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
        </>
    )

    
}

export default WebSocet;