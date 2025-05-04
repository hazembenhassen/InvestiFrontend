import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthorized(true);
    }
    setLoading(false);
  }, []);
  if (loading) return <div>Loading...</div>;
  return authorized ? children : <Navigate to="/" replace />;
};


export default ProtectedRoute;
