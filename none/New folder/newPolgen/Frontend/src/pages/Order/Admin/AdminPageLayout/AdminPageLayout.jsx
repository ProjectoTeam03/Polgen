import React, { useState } from "react";
import Navbar from "../../../../components/OrderComponent/Navbar/DashboardNavbar";
import Sidebar from "../../../../components/OrderComponent/Sidebar/Sidebar";
import AreYouSureMsg from "../../../../components/OrderComponent/AreYouSureMessg/AreYouSureMessg";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminPageLayout.module.css";

const AdminPageLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = () => {
    // Open the sign-out confirmation modal
    setShowSignOutModal(true);
  };

  const confirmSignOut = () => {
    // Clear user data and navigate to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cancelSignOut = () => {
    // Close the confirmation modal
    setShowSignOutModal(false);
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Navbar */}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Sidebar */}
      <Sidebar
        userType="admin" // Specify the user type as admin
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} // Toggle sidebar state
        onSignOut={handleSignOut} // Open the sign-out modal
      />
      
      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      
      {/* Sign-Out Confirmation Modal */}
      {showSignOutModal && (
        <AreYouSureMsg onConfirm={confirmSignOut} onCancel={cancelSignOut} />
      )}
    </div>
  );
};

export default AdminPageLayout;

