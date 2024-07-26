import React, { useState } from 'react';
import ParentSide from '../ParentChats/ParentSidebar/ParentSide'
import Parentmsg from '../ParentChats/ParentMessage/Parentmsg'

const ParentChats = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Update selectedUser state
  };

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm shadow-lg'>
      <div className='flex-shrink-0'>
        <ParentSide onSelectUser={handleSelectUser} /> {/* Pass handleSelectUser as prop */}
      </div>
      
      <div className='flex-grow px-5 py-3'>
        <Parentmsg selectedUser={selectedUser} /> {/* Pass selectedUser to Messages */}
      </div>
    </div>
  );
}

export default ParentChats;
