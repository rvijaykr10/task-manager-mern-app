import React from "react";
import styles from "./Button.scss";

export const Button = ({ name = "", type = "button", onClick = () => {} }) => {
  return (
    <div className={styles.elementButton}>
      <button type={type} onClick={onClick}>
        {name}
      </button>
    </div>
  );
};
