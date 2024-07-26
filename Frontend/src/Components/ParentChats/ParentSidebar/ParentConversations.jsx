import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {   useGetTeachersListpQuery } from '../../../Slices/userApiSlice';
import avatar from "../../../assets/avatar.jpg"; 
import ParentSearch from '../ParentSidebar/ParentSearch'; 

const ParentConversations = ({ onSelectUser }) => { // Accept onSelectUser as a prop
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [course, setCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: Teachers, error, isLoading } =      useGetTeachersListpQuery({ course });

  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      setCourse(userInfo.course);
    } else {
      navigate('/parent-login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    console.log("Teachers data:", Teachers);
  }, [Teachers]);

  const filteredTeachers = Teachers?.filter(Teachers =>
    Teachers.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUserClick = (user) => {
    onSelectUser(user); // Call onSelectUser callback with selected user
  };

  return (
    <div>
      < ParentSearch setSearchQuery={setSearchQuery} />
      <ul className="max-w-md">
        {filteredTeachers.map((Teachers) => (
          <li key={Teachers.id} className="py-3 sm:py-4" onClick={() => handleUserClick(Teachers)}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={Teachers.avatar || avatar} alt={Teachers.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {Teachers.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {Teachers.email}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParentConversations;
