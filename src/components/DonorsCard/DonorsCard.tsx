import React from 'react';
import './DonorsCard.scss';
import DonorItem from './DonorItem';

interface Donor {
  name: string;
  timesDonated: string;
  amount: string;
  avatar: string;
}

const donors: Donor[] = [
  { name: 'Mark Bernardo', timesDonated: '14X Donate', amount: '$15,210', avatar: '/avatars/avatar1.png' },
  { name: 'Willamina Fleming', timesDonated: '10X Donate', amount: '$14,400', avatar: '/avatars/avatar2.png' },
  { name: 'Cedric Kossou', timesDonated: '12X Donate', amount: '$12,000', avatar: '/avatars/avatar3.png' },
  { name: 'Yves Adjanohoun', timesDonated: '4X Donate', amount: '$10,575', avatar: '/avatars/avatar4.png' },
  { name: 'Barbara Liskov', timesDonated: '9X Donate', amount: '$9,900', avatar: '/avatars/avatar5.png' },
];

const DonorsCard: React.FC = () => {
  return (
    <div className="donor-card">
      <div className="donor-card-header">
        <h3>Donors</h3>
        <div className="donor-card-tabs">
          <button className="active">Top Donors</button>
          <button>Latest</button>
        </div>
      </div>
      <div className="donor-list">
        {donors.map((donor, index) => (
          <DonorItem key={index} {...donor} />
        ))}
      </div>
    </div>
  );
};

export default DonorsCard;
