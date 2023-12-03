import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.heading}>
        <Link to="/">
          <h2>Task Manager</h2>
        </Link>
        <span>&nbsp;(MERN)</span>
      </div>
      <div>
        <Link className={styles.link} to="/login">
          Login
        </Link>
        <Link className={styles.link} to="/register">
          Register
        </Link>
        <Link className={styles.link} to="/tasks">
          Tasks
        </Link>
        <Link className={styles.link} to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default Header;
