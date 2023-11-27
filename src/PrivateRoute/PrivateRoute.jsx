/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const accessToken = localStorage.getItem('accessToken');

  // if (loading) {
  //   return (
  //     <div>Loading...</div>
  //   );
  // }

  if (accessToken) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;