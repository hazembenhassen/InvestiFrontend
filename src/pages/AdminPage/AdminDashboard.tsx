import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminStyles.scss";
import { Users, Megaphone, GaugeCircle } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar/AdminNavbar";

interface Stats {
  totalUsers: number;
  totalCampaigns: number;
  activeCampaigns: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
  });

  useEffect(() => {
    setStats({
      totalUsers: 1250,
      totalCampaigns: 320,
      activeCampaigns: 78,
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNavbar/>
      <h1>Welcome, Admin</h1>


      <div className="dashboard-cards">

        <div className="card">
          <Users className="icon" />
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
          <Link to="/admin/users">Manage Users</Link>
        </div>

        <div className="card">
          <Megaphone className="icon" />
          <h3>Total Campaigns</h3>
          <p>{stats.totalCampaigns}</p>
          <Link to="/admin/campaigns">Manage Campaigns</Link>
        </div>

        <div className="card">
          <GaugeCircle className="icon" />
          <h3>Active Campaigns</h3>
          <p>{stats.activeCampaigns}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
