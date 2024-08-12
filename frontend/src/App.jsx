import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToaster } from "../src/slices/userSlice.js";
import styles from "./App.scss";
import Header from "./components/Header/Header.jsx";
import Toaster from "./components/Toaster/Toaster.jsx";
// import { GlobalNotification } from "./components/GlobalNotification/GlobalNotification.jsx";

const App = () => {
  const toasterDetails = useSelector((state) => state.users.toaster);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setToaster({ isOpen: true, text: "Welcome to Home Page!", type: "info" })
    );
  }, []);

  //
  return (
    <div className={styles.appContainer}>
      {/* <GlobalNotification /> */}
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Toaster {...toasterDetails} />
    </div>
  );
};

export default App;
