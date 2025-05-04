import React from 'react';
import Tabs from '../../components/ProfileComponents/Tabs';
import ProfileForm from '../../components/ProfileComponents/ProfileForm';
import ProfileCard from '../../components/ProfileComponents/ProfileCard';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  return (
    <>
    <h1> Mon Profile</h1>
    <div className={styles.container}>
      <div className={styles.settingsCard}>
        <Tabs />
        <ProfileForm />
      </div>
      <ProfileCard />
    </div>
    </>
  );
};

export default ProfilePage;
