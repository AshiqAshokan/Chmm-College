import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import TeacherConversations from '../../ParentChats/TeacherSidebar/TeacherConversations';

const TeacherSide = ({ onSelectUser }) => {
  const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!userInfo) {
        navigate('/teacher-login');
      }
    }, [userInfo, navigate]);
  return (
    <div className='p-4 flex flex-col '>
      <h1 className='m-1 text-xl text-white font-semibold'>Chats</h1>
      <div className='my-4'></div>
      <TeacherConversations onSelectUser={onSelectUser} /> {/* Pass onSelectUser to Conversations */}
    </div>
  );
}

export default TeacherSide;
