import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/BottomNav.module.css"; // Styling for the navigation bar

const BottomNav: React.FC = () => {
  return (
    <div className={styles.navContainer}>
      <Link to="/cart" className={styles.navItem}>
        <div className={styles.navLabel}>Main</div>
      </Link>
      <Link to="/rewards" className={styles.navItem}>
        <div className={styles.navLabel}>Rewards</div>
      </Link>
      <Link to="/points" className={styles.navItem}>
        <div className={styles.navLabel}>Points</div>
      </Link>
    </div>
  );
};

export default BottomNav;
