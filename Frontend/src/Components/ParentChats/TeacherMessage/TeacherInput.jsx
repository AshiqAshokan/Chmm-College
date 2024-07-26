// MessageInput.js

import React, { useState } from 'react';
import { useSendMessageMutation } from '../../../Slices/userApiSlice';
import { BsSend } from 'react-icons/bs';

const TeacherInput = ({ receiverId, userType }) => {
    console.log("userType from frontend",userType)
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && receiverId) {
      try {
        await sendMessage({ receiverId, message, userType }).unwrap();
        setMessage('');
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    } else {
      console.error('No receiver selected or message is empty');
    }
  };

  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherInput;
