import React from "react";
import styles from "./Register.scss";

const Register = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("called");
  };
  return (
    <div className={styles.register}>
      <div>
        <h2>Register</h2>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Enter name" />
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Enter password" />
          <input type="password" placeholder="Enter confirm password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
