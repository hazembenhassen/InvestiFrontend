import React from "react";
import "./userDetailsPopup.scss";

interface User {
  user_id: number;
  fullName: string;
  email: string;
  username: string | null;
  role: string;
  company_name: string | null;
  activity_field: string | null;
  address: string | null;
  type: string | null;
  statuts: string | null;
}

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetailsPopup: React.FC<Props> = ({ user, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>User Details</h3>
        <ul>
          <li><strong>Full Name:</strong> {user.fullName}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Username:</strong> {user.username || "-"}</li>
          <li><strong>Role:</strong> {user.role}</li>
          <li><strong>Company:</strong> {user.company_name || "-"}</li>
          <li><strong>Activity Field:</strong> {user.activity_field || "-"}</li>
          <li><strong>Address:</strong> {user.address || "-"}</li>
          <li><strong>Type:</strong> {user.type || "-"}</li>
          <li><strong>Status:</strong> {user.statuts}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
