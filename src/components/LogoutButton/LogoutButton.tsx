import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.post("http://localhost:8082/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  return (
    <button onClick={handleLogout} style={{
      color: "#94A3B8",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      width : "260px" ,
      fontWeight: "bold"
    }}>
      🔒 Logout
    </button>
  );
};

export default LogoutButton;
