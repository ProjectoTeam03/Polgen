import React from 'react';
import styles from './AdminSideBar.module.css';

const AdminSideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Admin Panel</div>
      <div className={styles.sidebarItem}>Dashboard</div>
      <div className={styles.sidebarItem}>Users</div>
      <div className={styles.sidebarItem}>Settings</div>
      <div className={styles.sidebarItem}>Reports</div>
      <div className={styles.sidebarItem}>Logout</div>
    </div>
  );
};

export default AdminSideBar;

