import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./CustomTextField.scss";

{
  /* <TextField id="standard-basic" label="Standard" variant="standard" /> */
}

export const CustomTextField = ({
  type = "text",
  value = "",
  label= "",
  onChange = () => {},
  required = false,
}) => {
  return (
    <div className={styles.elementTextField}>
      <TextField
        type={type}
        value={value}
        label={label}
        onChange={onChange}
        variant="standard"
        required={required}
      />
    </div>
  );
};

// import React from "react";
// import styles from "./TextField.scss";

// export const TextField = ({
//   type = "text",
//   id = "",
//   name = "",
//   value = "",
//   placeholder = "",
//   onChange = () => {},
//   required = false,
// }) => {
//   return (
//     <div className={styles.elementTextField}>
//       <input
// type={type}
// id={id}
// name={name}
// value={value}
// placeholder={placeholder}
// onChange={onChange}
// required={required}
//       />
//     </div>
//   );
// };
