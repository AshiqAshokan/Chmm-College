import React from 'react';
import ParentMsgs from '../ParentMessage/ParentMsgs'
import ParentInput from '../ParentMessage/ParentInput';

const Parentmsg = ({ selectedUser }) => {
  console.log('Selected User:', selectedUser);
  if (!selectedUser) {
    return <div>Please select a user to start chatting.</div>; // Handle case when no user is selected
}
  return (
    <div className='md:min-w-full flex flex-col h-full'>
      <div className='flex-1 overflow-auto'>
        <div className='bg-slate-500 px-4 py-3 mb-2'>
          <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>
            {selectedUser ? selectedUser.name : 'Select a User'}
          </span>
        </div>
        <ParentMsgs  receiverId={selectedUser._id} course={selectedUser.course} />
      </div>
      <ParentInput receiverId={selectedUser._id} userType={selectedUser.userType}  />
    </div>
  );
}

export default Parentmsg;
