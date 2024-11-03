import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { teal } from '@mui/material/colors';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  '&:hover': {
    backgroundColor: teal[700],
  },
}));

export const CustomButton = ({ name = "", type = "button", onClick = () => { } }) => {
  return (
    <ColorButton variant="contained" type={type} onClick={onClick}>{name}</ColorButton>
  );
}




// import React from "react";
// import styles from "./Button.scss";

// export const Button = ({ name = "", type = "button", onClick = () => {} }) => {
//   return (
//     <div className={styles.elementButton}>
//       <button type={type} onClick={onClick}>
//         {name}
//       </button>
//     </div>
//   );
// };
