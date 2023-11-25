import React from "react";
import styles from "./Header.scss";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h2>Task Manager</h2>
      <span>&nbsp;(MERN)</span>
    </div>
  );
};

export default Header;
