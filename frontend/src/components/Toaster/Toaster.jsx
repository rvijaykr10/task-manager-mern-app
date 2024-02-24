import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

const Toaster = (props) => {
  const [isToaster, setToaster] = useState(true);

  const { isOpen, text, type } = props;

  useEffect(() => {
    setToaster(isOpen);
  }, [isOpen, text, type]);

  const handleClose = () => {
    setToaster(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isToaster}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
