import React, {useEffect, useState} from 'react';
import  axios  from 'axios';

function LongPulling(){

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe()
    }, [])

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-message', {
            id : Date.now(),
            message : value
        })
    }

    const subscribe = async() =>{
        try{
            const {data} = await axios.get('http://localhost:5000/get-messages');
            setMessages(el => [data, ...el]);
            await subscribe()

        }catch(e){
            console.log(e)
            setTimeout(()=>{
                subscribe()
            }, 500)
        }
    }

    return (
        <>
            <h2>LongPulling</h2>
            <div className="form">
                <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {messages.map( e => 
                    <div className="message" key={e.id}>
                        {e.message}
                    </div>
                    ) }
            </div>
        </>
    )
}

export default LongPulling;