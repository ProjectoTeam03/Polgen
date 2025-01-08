import React from "react";
import CloseIcon from "@mui/icons-material/Close"; // Correctly imported CloseIcon from MUI
import styles from "./AdminSynthisGroup.module.css";

const PopupComponent = ({ onClose, loading, error }) => {
  return (
    <div className={styles.popupOverlay}>
      {" "}
      {/* Changed class name to match CSS */}
      <div className={styles.popupContainer}>
        <div className={styles.popupHeader}>
          <h2>User Information</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.popupContent}>
            {" "}
            {/* Changed class name to match CSS */}
            <p>
              Detailed user information here. Display data fetched from the
              server, allowing for edits or more detailed views as needed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupComponent;
