import { Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Input, MessageList } from 'react-chat-elements';
import "react-chat-elements/dist/main.css"
import SendIcon from '@mui/icons-material/Send';

function ClientChat(props) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
     

    const ws = new WebSocket(`ws://40.81.239.254:8001/chat/${props.chatId}/`);
    console.log("socket", props.chatId);
    useEffect(() => {
        if(props.chatId){
        var ws = new WebSocket(`ws://40.81.239.254:8001/chat/${props.chatId}/`);
        ws.onopen = function () {
            console.log('webSocket connection open ...');
            //  ws.send(JSON.stringify({ message: "Ashok" }))
        }
        ws.onmessage = function (event) {
            console.log("Message received from server...", event);

            const dataN = JSON.parse(event.data);
            let pos= dataN.usertype === "receiver" ? "left":"right";
            const newData = {
                position: pos,
                type: "text",
                title: dataN.usertype,
                text: dataN.message,
                // message: data.message,
                // usertype: data.usertype,
            };
            setMessages((prevMessages) => [...prevMessages,newData]);
        }
        ws.onclose = function (event) {
            console.log("webSocket connection closed ...");
            sessionStorage.removeItem("chatId");
        }
        // document.getElementById('chat-message-submit').onclick = function (event) {
        //     const messageInputDom = document.getElementById('chat-message-input')
        //     const message = messageInputDom.value
        //     ws.send(JSON.stringify({ message: message, usertype: "sender" }));
        //     console.log("data", JSON.stringify({ message: message, usertype: "sender" }));
        // }
        return () => ws.close();
    }
    }, []);
    const sendMessage = () => {
        ws.send(JSON.stringify({
            message: message,
            usertype: "sender"
        }));
        // recieve message every send message
        // ws.onmessage = (e) => {
           
        //     const data = JSON.parse(e.data);
        //     let pos= data.usertype === "receiver" ? "left":"right";
        //     const newData = {
        //         position: pos,
        //         type: "text",
        //         title: data.usertype,
        //         text: data.message,
        //     };
        //     setMessages([...messages, newData]);
        // };
      
    };
console.log("message list", messages);
    return (
        <div className='w-full flex flex-col '>
             <div className="w-full h-12 bg-indigo-950"></div>
            <div className='h-96 overflow-y-scroll no-scrollbar'>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={messages}
                />
            </div>
             <div className="p-2 w-full right-0 left-0 bottom-0">
                <Input
                className='p-2 border rounded-md'
                    placeholder="Type here..."                    
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    rightButtons={<Button type="submit" variant="contained" color="primary" onClick={sendMessage}>
                    <SendIcon />
                </Button>}
                />
                
            </div>
        </div>

    )
}

export default ClientChat