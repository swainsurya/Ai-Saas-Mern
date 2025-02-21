import { useAuth } from '@/context/AuthProvider'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {loggedIn} = useAuth();
  return (
    loggedIn ? <Outlet/> : (<Navigate to="/login" />)
  )
}

export default ProtectedRoute
