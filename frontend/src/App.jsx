import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToaster } from "../src/slices/userSlice.js";
import styles from "./App.scss";

import Header from "./components/Header/Header.jsx";
import Toaster from "./components/Toaster/Toaster.jsx";

const App = () => {
  const toasterDetails = useSelector((state) => state.users.toaster);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setToaster({
        isOpen: true,
        text: "Welcome to Home Page!",
        type: "info",
      })
    );
  }, []);

  return (
    <div className={styles.appContainer}>
      <Header />
      <Outlet />
      <Toaster {...toasterDetails} />
    </div>
  );
};

export default App;
