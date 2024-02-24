import React, { useEffect, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToaster } from "../src/slices/userSlice.js";
import styles from "./App.scss";

// Lazy-loaded Header component
const Header = lazy(() => import("./components/Header/Header.jsx"));

// Lazy-loaded Toaster component
const Toaster = lazy(() => import("./components/Toaster/Toaster.jsx"));

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
      {/* Wrap the Header component with Suspense */}
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Outlet />
      {/* Wrap the Toaster component with Suspense */}
      {/* <Suspense fallback={<div>Loading Toaster...</div>}> */}
      <Toaster {...toasterDetails} />
      {/* </Suspense> */}
    </div>
  );
};

export default App;
