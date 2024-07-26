import React from 'react'
import ParentSidebar from './ParentSidebar';
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const ParentPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/parent-login" />;
  }
  return (
    <div className="Parent-page" style={{ display: 'flex' }}>
    <ParentSidebar/>
    <div className="content" style={{  padding: '20px', width: '100%' }}>
      <Outlet />
    </div>
  </div>
  )
}

export default ParentPage
