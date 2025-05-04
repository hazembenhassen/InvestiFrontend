import React, { useEffect, useState } from "react";
import axios from "axios";
import DonorsCard from "../DonorsCard/DonorsCard";
import DashboardCardList from "../DashboardCard/DashboardCardList";
import Chart from "../Chart/Chart";
import "./BeneficiaryDashboard.scss"
const BeneficiaryDashboard: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8082/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(res.data.fullName || res.data.username || res.data.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, []);

  return (
    <>
      <h1>Bonjour, {username} 👋</h1>
      <DashboardCardList />
      <div className="SecLine">
        <DonorsCard />
        <Chart/>
      </div>
      
    </>
  );
};

export default BeneficiaryDashboard;
