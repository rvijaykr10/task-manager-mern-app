import React from "react";
import styles from "./App.scss";
import Header from "./components/Header/Header.jsx";
import Tasklist from "./components/Tasklist/Tasklist.jsx";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <Tasklist />
    </div>
  );
};

export default App;
