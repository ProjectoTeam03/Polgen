import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../../../../components/OrderComponent/UserComponent/UserSideBar/UserSideBar';
import styles from './UserPageLayout.module.css';

const UserPageLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sidebar}>
        <UserSideBar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserPageLayout;

