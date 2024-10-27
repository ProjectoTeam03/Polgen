import React from 'react';
import styles from './UserSideBar.module.css';

const UserSideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>User Panel</div>
      <div className={styles.sidebarItem}>Profile</div>
      <div className={styles.sidebarItem}>Messages</div>
      <div className={styles.sidebarItem}>Settings</div>
      <div className={styles.sidebarItem}>Notifications</div>
      <div className={styles.sidebarItem}>Logout</div>
    </div>
  );
};

export default UserSideBar;

