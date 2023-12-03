import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.scss";
import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
