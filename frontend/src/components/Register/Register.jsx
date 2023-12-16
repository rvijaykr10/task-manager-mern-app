import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setToaster } from "../../slices/userSlice.js";
import styles from "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  return (
    <div className={styles.register}>
      <div>
        <h2>Register</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            value={confirmPassword}
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
