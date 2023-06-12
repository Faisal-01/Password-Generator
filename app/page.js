"use client";

import styles from './page.module.css';
import { useState } from 'react';
import Simple from './simple';
import Complex from './complex';
import Link from 'next/link';

export default function Page() {

  const [selected, setSelected] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.navigator}>
        <button
          style={{
            "background-color":
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
            "background-color":
              selected === 2 ? "lightgrey" : "rgb(103, 103, 255)",
          }}
          type="button"
          className={styles.navigatorButtons}
          onClick={() => setSelected(2)}
        >
          Complex
        </button>
      </div>

      {selected === 1 ? <Simple /> : <Complex />}


          <Link href="/passwords" className={styles.getPasswordsButton}>
            All Passwords
          </Link >

    </div>
  );
}
