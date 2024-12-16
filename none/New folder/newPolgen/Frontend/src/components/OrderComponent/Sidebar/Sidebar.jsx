import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add"; // Icon for Add Product
import styles from "./Sidebar.module.css";
import { AccountCircleSharp } from "@mui/icons-material";

const Sidebar = ({ userType, isSidebarOpen, toggleSidebar, onSignOut }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dynamic navigation items based on userType
  const NAV_ITEMS = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: userType === "admin" ? `/admin/${id}/dashboard` : `/user/${id}/dashboard`,
    },
        {
      title: "Order",
      icon: <ShoppingCartIcon />,
      path: userType === "admin" ? `/admin/${id}/order` : `/user/${id}/order`,
    },

      {
      title: "Add Product",
      icon: <AddIcon />,
      path: userType === "admin" ? `/admin/${id}/add-product` : `/user/${id}/add-product`,
    },
            {
      title: "Profile",
      icon: <AccountCircleIcon />,
      path: userType === "admin" ? `/admin/${id}/profile` : `/user/${id}/profile`,
    },

    ...(userType === "admin"
      ? [
          {
            title: "Reports",
            icon: <CloseIcon />,
            path: `/admin/${id}/reports`,
          },
          {
      title: "Orders",
      icon: <ShoppingCartIcon />,
      path: userType === "admin" ? `/admin/${id}/orders` : `/user/${id}/orders`,
    },

        ]
      : []),
  ];

  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <ul>
          {NAV_ITEMS.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <div
                className={styles.navLink}
                onClick={() => navigate(item.path)}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out Button */}
      <div className={styles.signOut} onClick={onSignOut}>
        <span className={styles.icon}>
          <CloseIcon />
        </span>
        <span className={styles.label}>Sign Out</span>
      </div>
    </aside>
  );
};

export default Sidebar;

