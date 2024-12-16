import React from 'react';
import AdminTables from '../../../../components/OrderComponent/AdminComponent/AdminTables/AdminTables'; // Corrected path
import AdminChart from '../../../../components/OrderComponent/AdminComponent/AdminChart/AdminChart'; // Corrected path

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminChart />
      <AdminTables />
    </div>
  );
};

export default AdminDashboard;

