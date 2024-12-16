import React from 'react';
import UserStaticTables from '../../../../components/OrderComponent/UserComponent/UserStaticTables/UserStaticTables'; // Import the combined tables
import styles from './UserDashboard.module.css'; // Import CSS module for styling
import UserTables from '../../../../components/OrderComponent/UserComponent/UserTables/UserTables';

const UserDashboard = () => {
  return (
    <div className={styles['dashboard-container']}>
      <h1 className={styles['dashboard-title']}>User Dashboard</h1> {/* Apply the CSS module class here */}
      <UserStaticTables />
      <UserTables/>
    </div>
  );
};

export default UserDashboard;

