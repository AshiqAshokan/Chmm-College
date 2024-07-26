import React from 'react'
import TeacherSidebar from './TeacherSidebar';
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const TeacherPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/teacher-login" />;
  }
  return (
    <div className="Teacher-page" style={{ display: 'flex' }}>
    <TeacherSidebar/>
    <div className="content" style={{  padding: '20px', width: '100%' }}>
      <Outlet />
    </div>
  </div>
  )
}

export default TeacherPage
