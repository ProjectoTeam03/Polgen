import React from 'react';
import AdminSideBar from '../../../../components/OrderComponent/AdminComponent/AdminSideBar/AdminSideBar';
import { Outlet } from 'react-router-dom';
import styles from './AdminPageLayout.module.css';

const AdminPageLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sidebar}>
        <AdminSideBar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPageLayout;

