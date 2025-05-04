import React, { useState } from "react";
import "./Sidebar.scss";
import {
  FaTachometerAlt,
  FaStore,
  

} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";


import LogoutButton from "../LogoutButton/LogoutButton";
import { IoDocument } from "react-icons/io5";


interface SidebarProps {
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect('dashboard')}><FaTachometerAlt /> Dashboard</li>
        <li onClick={() => onSelect('campaigns')}><FaStore /> My Compaingns</li>
        <li onClick={() => onSelect('Documents')}><IoDocument /> My Documents</li>
        <li onClick={() => onSelect('Community')}><RiUserCommunityLine /> Community</li>
        <li onClick={() => onSelect('Support')}><MdSupportAgent /> Support</li>
      </ul>
      <div className="LogoutButton">
      <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
