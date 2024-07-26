import React from 'react'
import OfficeSidebar from './OfficeSidebar'
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/office-login" />;
  }
  return (
    <div className="Admin-page" style={{ display: 'flex' }}>
    <OfficeSidebar/>
    <div className="content" style={{  padding: '20px', width: '100%' }}>
      <Outlet />
    </div>
  </div>
  )
}

export default AdminPage
