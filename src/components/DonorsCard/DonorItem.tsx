import React from 'react';
import './DonorsCard.scss';
import { FiMoreVertical } from 'react-icons/fi';

interface DonorItemProps {
  name: string;
  timesDonated: string;
  amount: string;
  avatar: string;
}

const DonorItem: React.FC<DonorItemProps> = ({ name, timesDonated, amount, avatar }) => {
  return (
    <div className="donor-item">
      <div className="donor-info">
        <img src={avatar} alt={name} className="avatar" />
        <div className="text">
          <span className="name">{name}</span>
          <span className="times">{timesDonated}</span>
        </div>
      </div>
      <div className="donor-amount">
        <span>{amount}</span>
        <FiMoreVertical className="menu-icon" />
      </div>
    </div>
  );
};

export default DonorItem;
