import React from 'react';
import styles from './Tabs.module.scss';

const Tabs: React.FC = () => {
  const tabs = ['Paramétre Utilisateur', 'Paramétre Entreprise'];

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <span key={tab} className={tab === 'Paramétre Utilisateur' ? styles.activeTab : ''}>
          {tab}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
