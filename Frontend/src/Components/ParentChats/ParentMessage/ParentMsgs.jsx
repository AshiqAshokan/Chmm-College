import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import avatar from "../../../assets/avatar.jpg"; 
import { format } from 'date-fns';
import { useFetchMessagesQuery } from '../../../Slices/userApiSlice';

const socket = io('https://chmm-college.onrender.com/chat'); // Ensure this matches your server URL and port

const ParentMsgs = ({ receiverId, course }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    const { data: response } = useFetchMessagesQuery({ receiverId, course }, { skip: !receiverId });

    useEffect(() => {
        if (!userInfo) {
            navigate('/teacher-login');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (response) {
            setMessages(response.data);
        }
    }, [response]);

    useEffect(() => {
        if (receiverId) {
            socket.emit('join', { userId: userInfo._id, receiverId });

            socket.on('message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off('message');
            };
        }
    }, [receiverId, userInfo]);

    const sendMessage = () => {
        const newMessage = {
            sender: userInfo._id,
            receiver: receiverId,
            content: messageContent,
            createdAt: new Date()
        };
        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageContent('');
    };

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {messages.map((message) => (
                <div 
                    key={message._id || message.createdAt} 
                    className={`chat ${message.sender === receiverId ? 'chat-start' : 'chat-end'}`}
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User Avatar" src={avatar} />
                        </div>
                    </div>
                    <div className="chat-bubble">{message.content}</div>
                    <div className="chat-footer opacity-50">
                        <time className="text-xs opacity-50">
                            {format(new Date(message.createdAt), "dd MMM yyyy HH:mm")}
                        </time>
                    </div>
                </div>
            ))}
            {/* <input 
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="input-field"
            />
            <button onClick={sendMessage} className="send-button">Send</button> */}
        </div>
    );
};

export default ParentMsgs;
