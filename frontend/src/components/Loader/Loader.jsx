import React from "react";
import styles from "./Loader.scss";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};
