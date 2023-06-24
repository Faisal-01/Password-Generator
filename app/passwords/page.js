'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import styles from './passwords.module.css';
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useRouter} from "next/navigation";
import Alert from "../components/Alert/alert";
import { useAppContext } from "../context";

export default function Passwords() {

  const [passwords, setPasswords] = useState([]);

  // const [alert, setAlert] = useState("");

  const {push} = useRouter();

  const {alert, setAlert} = useAppContext()

  const getPasswords = async () => {
    try {
      const response = await axios.get("/api/");
      setPasswords(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const copyHandler = (password) => {
    navigator.clipboard.writeText(password);
    setAlert({ status: true, message: "Copied Successfully" });

  }

  const backHandler = () => {
    push("/");
  }

  const deleteHandler = async (id) => {
    
    try {
      const response = await axios.delete(`/api/${id}`);
      setAlert({status: true, message: response.data.message});
      getPasswords()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPasswords();
  }, [passwords.length])

  return (
    <div className={styles.container}>
      <button className={styles.backContainer} onClick={backHandler}><ArrowBackIosIcon className={styles.backIcon}/><p>Back</p></button>
      <h1 className={styles.title}>Passwords</h1>

      <ul className={styles.passwords}>
        <li className={styles.password}>
          <p className={styles.header}>Password</p>
          <p className={styles.header}>Type</p>
          <p className={styles.header}>For</p>
          <p className={styles.header}>Action</p>
        </li>

        {passwords?.map((password) => {
          return (
            <li key={password._id} className={styles.password}>
              <p>{password.password}</p>
              <p>{password.passwordType}</p>
              <p>{password.for}</p>
              <div className={styles.actionContainer}>
                <DeleteIcon
                  className={styles.icon}
                  onClick={() => deleteHandler(password._id)}
                />
                <ContentCopyIcon
                  className={styles.icon}
                  onClick={() => copyHandler(password.password)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {alert.status && <Alert />}
    </div>
  );
}
