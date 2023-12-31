import React from "react";
import { useSelector } from "react-redux";
import styles from "./Home.scss";

const Home = () => {
  const userInfo = useSelector((state) => state.users.userInfo);
  return (
    <div className={styles.home}>
      {userInfo?.name ? (
        <p>Hey {userInfo?.name}!!! Welcome Home</p>
      ) : (
        <p>Welcome to Task Manager!</p>
      )}
    </div>
  );
};
export default Home;
