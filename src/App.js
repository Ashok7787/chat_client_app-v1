import './App.css';
import "react-chat-elements/dist/main.css"
import React, { useEffect, useState } from 'react';
import ClientChat from './ClientChat';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  borderRadious:"5px",
  top: '46%',
  left: '92%',
  transform: 'translate(-80%, -44%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chatbotId, setChatbotId] = useState(sessionStorage.getItem("chatId"));
  useEffect(() => {
    if (chatbotId === null) {
      makeid(6);
    }
  }, []);
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    sessionStorage.setItem("chatId", result);
  }
  const chatId = sessionStorage.getItem("chatId");  
  return (
    <div >
       <Modal
      
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ClientChat chatId={chatId}/>
        </Box>
      </Modal>
    {!open?
      <button onClick={handleOpen} className=' bg-indigo-950 rounded-full fixed right-2 bottom-2 p-4 border text-lg text-white font-bold flex gap-2 '>Chat<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
      </button>:
      <button onClick={handleOpen} className=' bg-indigo-950 rounded-full fixed right-2 bottom-2 p-4 border text-lg text-white font-bold flex gap-2 '>Chat<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    
    </button>}
      {/* <ChatComponent  />      */}
    </div>
  );
};

export default App;
