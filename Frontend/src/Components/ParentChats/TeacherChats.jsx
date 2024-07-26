import React, { useState } from 'react';
import TeacherSide from '../ParentChats/TeacherSidebar/TeacherSide'
import Teachermsg from '../ParentChats/TeacherMessage/Teachermsg'

const TeacherChats = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Update selectedUser state
  };

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm shadow-lg'>
      <div className='flex-shrink-0'>
        <TeacherSide onSelectUser={handleSelectUser} /> {/* Pass handleSelectUser as prop */}
      </div>
      
      <div className='flex-grow px-5 py-3'>
        <Teachermsg selectedUser={selectedUser} /> {/* Pass selectedUser to Messages */}
      </div>
    </div>
  );
}

export default TeacherChats;
