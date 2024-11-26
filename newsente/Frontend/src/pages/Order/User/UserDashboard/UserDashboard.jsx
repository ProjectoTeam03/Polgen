import React from 'react';
import UserTables from '../../../../components/OrderComponent/UserComponent/UserTables/UserTables';
import AddProductForm from '../../../../components/OrderComponent/UserComponent/AddProductForm/AddProductForm';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <AddProductForm />
      <UserTables />
    </div>
  );
};

export default UserDashboard;

