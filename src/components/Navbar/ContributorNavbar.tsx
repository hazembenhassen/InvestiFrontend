import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { FaUserCircle, FaCog } from 'react-icons/fa';
import Logo from "../../assets/images/logo.png";


interface NavbarProps {
    onSelect: (key: string) => void;
  }

const ContributorNavbar: React.FC <NavbarProps> = ({ onSelect }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <nav className={styles.navbar}>

            <div className={styles.left}>
                <img src={Logo} alt="Crowdfy Logo" className={styles.logoIcon} />
                <button className={styles.ContributorNavBtn}>Mes Contributions</button>
              <button className={styles.ContributorNavBtn}>Campagnes disponnibles</button>
              <button className={styles.ContributorNavBtn}>Mon Wallet</button>
            </div>
            
            <div className={styles.right}>
             
                <FaUserCircle className={styles.icon} onClick={() => onSelect('profile')}/>
                <FaCog className={styles.icon} />
            </div>

        </nav>
    );
};

export default ContributorNavbar;
