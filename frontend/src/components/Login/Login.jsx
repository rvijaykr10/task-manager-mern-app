import React from "react";
import styles from "./Login.scss";

const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("called");
  };
  return (
    <div className={styles.login}>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Enter password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
