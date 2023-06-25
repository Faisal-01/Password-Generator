"use client";

import styles from './login.module.css';
import { useAppContext } from '../context';
import {useState} from 'react';
import Alert from '../components/Alert/alert';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export default function Login() {

    const {alert, setAlert} = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {push} = useRouter();

    async function submitHandler(e){
        e.preventDefault();
    try{
      const response = await axios.post("api/auth/login", {
        email: email,
        password: password,
      })

      setAlert({status: true, message: response.data.message})
      push("/");
      localStorage.setItem("user", response.data.userID);
    }
    catch(e){
      setAlert({ status: true, message: e.response.data.message });

      console.log(e);
    }
    }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Generator and Strength Checker</h1>

      <form className={styles.loginContainer} onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className={styles.inputContainer}>
          <div className={styles.emailContainer}>
            <label htmlFor="email">Enter Email:</label>

            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="password">Enter Password:</label>

            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>

        <div className={styles.signupContainer}>
          Don't have an account? &nbsp;<Link href="/signup">Signup</Link>
        </div>
      </form>
      {alert.status && <Alert />}
    </div>
  );
}
