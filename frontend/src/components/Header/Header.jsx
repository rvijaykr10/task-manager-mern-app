import React from "react";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, logout } from "../../slices/userSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(logout());
  };

  const isLoggedIn = userInfo && Object.keys(userInfo)?.length > 0;
  return (
    <div className={styles.headerContainer}>
      <div className={styles.heading}>
        <Link to="/">
          <h2>Task Manager</h2>
        </Link>
        <span>&nbsp;(MERN)</span>
      </div>
      {userInfo?.name && <div>User : {userInfo?.name}</div>}
      {!isLoggedIn ? (
        <div>
          <Link className={styles.link} to="/login">
            Login
          </Link>
          <Link className={styles.link} to="/register">
            Register
          </Link>
          {/* <Link className={styles.link} to="/about">
            About
          </Link> */}
        </div>
      ) : (
        <div>
          <Link className={styles.link} to="/tasks">
            Tasks
          </Link>
          {/* <Link className={styles.link} to="/about">
            About
          </Link> */}
          <Link className={styles.link} to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
