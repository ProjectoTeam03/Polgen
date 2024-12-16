import React from 'react';
import DashboardNavbar from '../../../../components/OrderComponent/Navbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';

const AdminPageLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default AdminPageLayout;

