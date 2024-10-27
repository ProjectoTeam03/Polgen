import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h3>Login</h3>
        <input type="email" placeholder="Email" className={styles.inputField} />
        <input type="password" placeholder="Password" className={styles.inputField} />
        <button className={styles.loginButton}>Login</button>
      </div>
    </div>
  );
};

export default Login;

