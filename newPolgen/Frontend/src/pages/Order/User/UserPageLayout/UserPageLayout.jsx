import React, { useState } from "react";
import Navbar from "../../../../components/OrderComponent/Navbar/DashboardNavbar";
import Sidebar from "../../../../components/OrderComponent/Sidebar/Sidebar";
import AreYouSureMsg from "../../../../components/OrderComponent/AreYouSureMessg/AreYouSureMessg";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./UserPageLayout.module.css";

const UserPageLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = () => {
    setShowSignOutModal(true); // Open confirmation modal
  };

  const confirmSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cancelSignOut = () => {
    setShowSignOutModal(false); // Close modal without signing out
  };

  return (
    <div className={styles.layoutContainer}>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar
        userType="user"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onSignOut={handleSignOut} // Pass the handleSignOut function
      />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      {showSignOutModal && (
        <AreYouSureMsg onConfirm={confirmSignOut} onCancel={cancelSignOut} />
      )}
    </div>
  );
};

export default UserPageLayout;

