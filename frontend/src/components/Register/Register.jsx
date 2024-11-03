import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setToaster } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomTextField } from "@elements";
import styles from "./Register.scss";
import { Loader } from "../Loader/Loader.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const { userInfo, status } = useSelector((state) => state.users);
  const isLoggedIn = userInfo && Object.keys(userInfo)?.length > 0;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        dispatch(
          setToaster({
            isOpen: false,
            text: "",
            type: "",
          })
        );
        dispatch(
          setToaster({
            isOpen: true,
            text: "Passwords not matching!",
            type: "error",
          })
        );
        return;
      }
      const apiBody = {
        name,
        email,
        password,
      };
      dispatch(registerUser(apiBody));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading")
    return (
      <div className={styles.registerLoader}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.register}>
      <div>
        <h2>Register</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <CustomTextField
            type="text"
            value={name}
            label="Enter name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <CustomTextField
            type="email"
            value={email}
            label="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <CustomTextField
            type="password"
            value={password}
            label="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CustomTextField
            type="password"
            value={confirmPassword}
            label="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <CustomButton name={"Submit"} type={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default Register;
