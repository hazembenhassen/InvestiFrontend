import React from 'react';
import './DashboardCard.scss';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  linkText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, linkText }) => {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <div className="card-header">
          <span className="card-title">{title}</span>
          <span className="card-icon">{icon}</span>
        </div>
        <div className="card-value">{value}</div>
      </div>
      <div className="card-footer">
        <a href="#">{linkText}</a>
      </div>
    </div>
  );
};

export default DashboardCard;
