import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SideBar from '../Chats/StudentSidebar/SideBar';
import Messages from '../Chats/StudentMessages/messages';

const StudentChats = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!userInfo) {
        navigate('/student-login');
      }
    }, [userInfo, navigate]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Update selectedUser state
  };

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm shadow-lg'>
      <div className='flex-shrink-0'>
        <SideBar onSelectUser={handleSelectUser} /> {/* Pass handleSelectUser as prop */}
      </div>
      
      <div className='flex-grow px-5 py-3'>
        <Messages selectedUser={selectedUser} /> {/* Pass selectedUser to Messages */}
      </div>
    </div>
  );
}

export default StudentChats;
