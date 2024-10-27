import React from 'react';
import styles from './AdminTables.module.css';

const AdminTables = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableTitle}>Admin Data Table</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>janesmith@example.com</td>
            <td>User</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Bob Johnson</td>
            <td>bobjohnson@example.com</td>
            <td>Moderator</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminTables;

