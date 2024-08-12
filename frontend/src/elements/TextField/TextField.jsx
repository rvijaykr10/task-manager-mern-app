import React from "react";
import styles from "./TextField.scss";

export const TextField = ({
  type = "text",
  id = "",
  name = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = false,
}) => {
  return (
    <div className={styles.elementTextField}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
