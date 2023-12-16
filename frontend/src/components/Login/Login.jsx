import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/userSlice.js";
import styles from "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const userInfo = useSelector((state) => state.users.userInfo);
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
  return (
    <div className={styles.login}>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
