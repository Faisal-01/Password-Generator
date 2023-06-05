"use client";

import styles from './page.module.css';
import { useState } from 'react';
import Simple from './simple';
import Complex from './complex';

export default function Page() {

  const [selected, setSelected] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.navigator}>
        <button
          type="button"
          className={styles.navigatorButtons}
          onClick={() => setSelected(1)}
        >
          Simple
        </button>
        <button
          type="button"
          className={styles.navigatorButtons}
          onClick={() => setSelected(2)}
        >
          Complex
        </button>
      </div>

      {selected === 1 ? <Simple /> : <Complex />}
    </div>
  );
}
