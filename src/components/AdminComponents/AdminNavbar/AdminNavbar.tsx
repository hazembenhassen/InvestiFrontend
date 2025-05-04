import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { FaPlusCircle, FaUserCircle, FaCog } from 'react-icons/fa';
import Logo from "../../../assets/images/logo.png";
import { Link } from 'react-router-dom';


interface NavbarProps {
    onSelect: (key: string) => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ onSelect }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <nav className={styles.navbar}>

            <div className={styles.left}>
                <img src={Logo} alt="Crowdfy Logo" className={styles.logoIcon} />
            </div>
            <h3>Espace Administrateur</h3>
            <li>
                <Link to="/admin/projects">Manage Projects</Link>
            </li>

            <div className={styles.right}>

                <FaUserCircle className={styles.icon} onClick={() => onSelect('profile')} />
                <FaCog className={styles.icon} />
            </div>


        </nav>
    );
};

export default AdminNavbar;
