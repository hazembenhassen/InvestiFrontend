import React from 'react';
import { FaCoins, FaBookmark, FaHeart, FaEye } from 'react-icons/fa';
import DashboardCard from './DashboardCard';
import './DashboardCard.scss';

const DashboardCardList: React.FC = () => {
  return (
    <div className="dashboard-card-list">
      <DashboardCard title="Donations" value="$1,280" icon={<FaCoins />} linkText="View analytics" />
      <DashboardCard title="Saves" value="6,785" icon={<FaBookmark />} linkText="View report" />
      <DashboardCard title="Likes" value="77" icon={<FaHeart />} linkText="View report" />
      <DashboardCard title="Views" value="13,767" icon={<FaEye />} linkText="View report" />
    </div>
  );
};

export default DashboardCardList;
