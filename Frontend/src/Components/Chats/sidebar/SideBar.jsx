import React from 'react';
import Conversations from '../sidebar/Conversations';

const SideBar = ({ onSelectUser }) => {
  return (
    <div className='p-4 flex flex-col '>
      <h1 className='m-1 text-xl text-white font-semibold'>Chats</h1>
      <div className='my-4'></div>
      <Conversations onSelectUser={onSelectUser} /> {/* Pass onSelectUser to Conversations */}
    </div>
  );
}

export default SideBar;
