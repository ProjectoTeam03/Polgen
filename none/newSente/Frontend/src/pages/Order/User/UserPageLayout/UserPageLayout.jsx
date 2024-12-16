import React from 'react';
import DashboardNavbar from '../../../../components/OrderComponent/Navbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';
import styles from './UserPageLayout.module.css'; // Optional CSS module for layout-specific styles

const UserPageLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <DashboardNavbar />
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserPageLayout;

