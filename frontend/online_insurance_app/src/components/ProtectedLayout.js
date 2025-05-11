import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = ({ role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  console.log("Token:", localStorage.getItem("token"));
  console.log("Role:", localStorage.getItem("role"));
  console.log("name:", localStorage.getItem("name"));

  
  if (!token) return <Navigate to="/login" />;
  if (userRole !== role) return <Navigate to={`/${userRole}-dashboard`} />;

  return <Outlet />;
};

export default ProtectedLayout;
