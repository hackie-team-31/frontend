import React from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Welcome Back!</h2>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className={styles.input}
          />
        </div>
        <a href="#" className={styles.link}>
          Forgot password?
        </a>
        <div className={styles.divider}></div>
        <Link to="/signup" className={styles.link}>
          Don't have an account? Sign up
        </Link>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
