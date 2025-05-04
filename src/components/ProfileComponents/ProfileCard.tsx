import React from 'react';
import styles from './ProfileCard.module.scss';

const ProfileCard: React.FC = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.avatarSection}>
        <img src="https://via.placeholder.com/100" alt="Profile" className={styles.avatar} />
        <div className={styles.cameraIcon}>📷</div>
      </div>
      <div className={styles.stats}>
        <div>Opportunities Applied <span>32</span></div>
        <div>Opportunities Won <span>26</span></div>
        <div>Current Opportunities <span>6</span></div>
      </div>
      <button className={styles.profileButton}>View Public Profile</button>
      <input
        type="text"
        className={styles.profileLink}
        value="https://Thenourproject.Com/Icon...."
        readOnly
      />
    </div>
  );
};

export default ProfileCard;
