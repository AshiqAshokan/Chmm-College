// src/Components/StudentPage.js
import React from 'react';
import Home from './Home';
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const StudentPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/student-login" />;
  }
  return (
    <div className="student-page" style={{ display: 'flex' }}>
      <Home />
      <div className="content" style={{  padding: '20px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentPage;
