import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { FaPlusCircle, FaUserCircle, FaCog } from 'react-icons/fa';
import Logo from "../../assets/images/logo.png";
import SearchBar from '../SearchBar/SearchBar';


interface NavbarProps {
    onSelect: (key: string) => void;
  }

const Navbar: React.FC <NavbarProps> = ({ onSelect }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <nav className={styles.navbar}>

            <div className={styles.left}>
                <img src={Logo} alt="Crowdfy Logo" className={styles.logoIcon} />
                <SearchBar placeholder="Search donors..." onChange={setSearchValue} />

            </div>
            <div className={styles.right}>
                <div className={styles.createCampaign} onClick={() => onSelect('NewCampaign') }>
                    <FaPlusCircle className={styles.plusIcon} />
                    <span>Create a new campaign</span>
                </div>
                <FaUserCircle className={styles.icon} onClick={() => onSelect('profile')}/>
                <FaCog className={styles.icon} />
            </div>

        </nav>
    );
};

export default Navbar;
