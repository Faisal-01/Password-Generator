"use client";

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Simple from './components/simple/simple';
import Complex from './components/complex/complex';
import Link from 'next/link';
import CheckPassowrd from './components/Check Password/checkPassowrd';
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from 'next/navigation';

export default function Page() {

  const [selected, setSelected] = useState(1);

  const {push} = useRouter()

  const logoutHandler = () => {
    localStorage.removeItem("user");
    push("/login")
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      push("/login")
    }
  
  }, [])

  return (

      <div className={styles.container}>
        <div className={styles.iconContainer} onClick={logoutHandler}>

        <LogoutIcon className={styles.logoutIcon}/>
        </div>
        <div className={styles.navigator}>
          <button
            style={{
              backgroundColor:
                selected === 1 ? "lightgrey" : "rgb(103, 103, 255)",
            }}
            type="button"
            className={styles.navigatorButtons}
            onClick={() => setSelected(1)}
          >
            Simple
          </button>
          <button
            style={{
              backgroundColor:
                selected === 2 ? "lightgrey" : "rgb(103, 103, 255)",
            }}
            type="button"
            className={styles.navigatorButtons}
            onClick={() => setSelected(2)}
          >
            Complex
          </button>
          <button
            style={{
              backgroundColor:
                selected === 3 ? "lightgrey" : "rgb(103, 103, 255)",
            }}
            type="button"
            className={styles.navigatorButtons}
            onClick={() => setSelected(3)}
          >
            Check Password Strength
          </button>
        </div>

        {selected === 1 && <Simple />}
        {selected === 2 && <Complex />}
        {selected === 3 && <CheckPassowrd />}

        <Link href="/passwords" className={styles.getPasswordsButton}>
          All Passwords
        </Link>
      </div>

  );
}
