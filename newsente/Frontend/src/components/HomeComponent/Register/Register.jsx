import React from 'react';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <h3>Register</h3>
        <input type="email" placeholder="Email" className={styles.inputField} />
        <input type="password" placeholder="Password" className={styles.inputField} />
        <input type="tel" placeholder="Phone Number" className={styles.inputField} />
        <input type="text" placeholder="Address" className={styles.inputField} />
        <button className={styles.submitButton}>Submit</button>
        <button className={styles.googleButton}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Register;

