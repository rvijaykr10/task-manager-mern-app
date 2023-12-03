import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../slices/userSlice.js";
import styles from "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
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
