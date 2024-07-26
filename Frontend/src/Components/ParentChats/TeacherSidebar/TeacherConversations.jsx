import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetParentListQuery } from '../../../Slices/userApiSlice';
import avatar from "../../../assets/avatar.jpg"; 
import TeacherSearch from '../TeacherSidebar/TeacherSearch'; 

const TeacherConversations = ({ onSelectUser }) => { // Accept onSelectUser as a prop
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [course, setCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: parents, error, isLoading } =    useGetParentListQuery({ course });

  useEffect(() => {
    if (userInfo) {
      setCourse(userInfo.course);
    } else {
      navigate('/teacher-login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    console.log("parents data:", parents);
  }, [parents]);

  const filteredparents = parents?.filter(parents =>
    parents.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUserClick = (user) => {
    onSelectUser(user); // Call onSelectUser callback with selected user
  };

  return (
    <div>
      <TeacherSearch setSearchQuery={setSearchQuery} />
      <ul className="max-w-md">
        {filteredparents.map((parents) => (
          <li key={parents.id} className="py-3 sm:py-4" onClick={() => handleUserClick(parents)}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={parents.avatar || avatar} alt={parents.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {parents.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {parents.email}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherConversations;
