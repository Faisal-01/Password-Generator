"use client";

import styles from "./signup.module.css";
import { useAppContext } from "../context";
import { useState } from "react";
import axios from 'axios';
import Alert from "../components/Alert/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const { alert, setAlert } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {push} = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    try{
      const response = await axios.post("api/auth/register/", {
        name: name,
        email: email,
        password: password,
      })

      setAlert({status: true, message: response.data.message})
      push("/login");
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Generator and Strength Checker</h1>

      <form className={styles.loginContainer} onSubmit={submitHandler}>
        <h2>Signup</h2>
        <div className={styles.inputContainer}>
          <div className={styles.nameContainer}>
            <label htmlFor="email">Enter Name:</label>

            <input
              type="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
          Signup
        </button>

        <div className={styles.loginTextContainer}>
          Already have an account? &nbsp;<Link href="/login">Login</Link>
        </div>
      </form>
      {alert.status && <Alert />}
    </div>
  );
}
