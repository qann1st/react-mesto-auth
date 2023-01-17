import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateOutlet({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
