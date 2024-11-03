import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomTextField } from "@elements";
import { Loader } from "../Loader/Loader.jsx";
import styles from "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const apiBody = {
      email,
      password,
    };
    dispatch(loginUser(apiBody));
    setEmail("");
    setPassword("");
  };

  if (status === "loading")
    return (
      <div className={styles.loginLoader}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.login}>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <CustomTextField
            type="email"
            value={email}
            label="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <CustomTextField
            type="password"
            value={password}
            label="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CustomButton name={"Submit"} type={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
