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
    const userId = localStorage.getItem("user");
    try {
      const response = await axios.get(`/api/user/${userId}`);
      setPasswords(response.data.passwords);
    } catch (error) {
      console.log(error)
    }
  }

  const copyHandler = (password) => {
    navigator.clipboard.writeText(password);
    setAlert({status: true, message: "Password copied to clipboard"});
  }

  const backHandler = () => {
    push("/");
  }

  const deleteHandler = async (id) => {
    const userId = localStorage.getItem("user");
    
    try {
      const response = await axios.patch(`/api/password/${id}`, {userId});
      setAlert({status: true, message: response.data.message});
      getPasswords()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      push("/login");
    }
  }, []);

  useEffect(() => {
    getPasswords();
  }, [passwords?.length])

  return (
    <div className={styles.container}>
      <button className={styles.backContainer} onClick={backHandler}><ArrowBackIosIcon className={styles.backIcon}/><p>Back</p></button>
      <h1 className={styles.title}>Passwords</h1>

      {passwords?.length > 0 ? <ul className={styles.passwords}>
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
      </ul> : <p className={styles.noPasswords}>No passwords yet</p>}
      {alert.status && <Alert />}
    </div>
  );
}
