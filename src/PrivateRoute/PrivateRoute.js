import { useContext, useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { globalLoading, token } = useContext(AuthContext);
  // console.log(children);
  const location = useLocation();

  if (globalLoading) {
    return (
      <div className="min-w-[99vw] mx-auto h-screen flex items-center justify-center overflow-x-hidden">
        <HashLoader color="#289dcf" />
      </div>
    );
  }
  if (token) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
