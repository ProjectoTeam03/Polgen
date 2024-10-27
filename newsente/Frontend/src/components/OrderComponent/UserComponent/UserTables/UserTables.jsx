import React from 'react';
import styles from './UserTables.module.css';

const UserTables = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableTitle}>User Activity Table</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-10-01</td>
            <td>Login</td>
            <td>Success</td>
          </tr>
          <tr>
            <td>2023-10-02</td>
            <td>Viewed Profile</td>
            <td>Success</td>
          </tr>
          <tr>
            <td>2023-10-03</td>
            <td>Attempted Password Change</td>
            <td>Failed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTables;

