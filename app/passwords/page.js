'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import styles from './passwords.module.css';

export default function Passwords() {

  const [passwords, setPasswords] = useState([]);

  const getPasswords = async () => {
    const response = await axios.get("http://localhost:3001/api/");
    setPasswords(response.data);
  }

  useEffect(() => {
    getPasswords();
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Passwords</h1>

      <ul className={styles.passwords}>
        <li className={styles.password}>
          <p className={styles.header}>Password</p>
          <p className={styles.header}>Type</p>
          <p className={styles.header}>For</p>
        </li>

        {passwords?.map((password) => {
          return (
            <li key={password._id} className={styles.password}>
              <p>{password.password}</p>
              <p>{password.passwordType}</p>
              <p>{password.for}</p>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
}
