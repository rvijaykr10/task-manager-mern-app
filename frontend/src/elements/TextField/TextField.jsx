import React from "react";
import styles from "./TextField.scss";

export const TextField = ({
  type = "text",
  id = "",
  name = "",
  ref = {},
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
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
