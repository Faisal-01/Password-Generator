import styles from './simple.module.css';
import { useState } from 'react';

export default function Simple() {

    const [length, setLength] = useState(4);
    const [password, setPassword] = useState("");

    const generateHandler = (e) => {
        e.preventDefault()
        setPassword("");
        const numberOfDigits = 2;
        const numberOfCharacters = length - numberOfDigits;
        const numbers = "0123456789";
        const alphabets = "abcdefghijklmnopqrstuvwxyz";

        for(let i = 0; i < numberOfDigits; i++){
            setPassword(prev => {
                return prev += numbers[Math.floor(Math.random() * 10)]
            })
        }

        for (let i = 0; i < numberOfCharacters; i++) {
          setPassword((prev) => {
            console.log(alphabets[Math.floor(Math.random() * 27)]);
            return (prev += alphabets[Math.floor(Math.random() * 26)]);
          });
        }
    }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Simple Password Generator</h1>

        <form className={styles.generatorContainer} onSubmit={generateHandler}>
            <div className={styles.inputContainer}>
                <label htmlFor="length">
                    Enter Length:
                </label>

                <input type="number" min={4} max={10} id='length' required value={length} onChange={(e) => setLength(e.target.value)}/>
            </div>

            <button type='submit' className={styles.generateButton}>Generate</button>
            <div className={styles.output}>
                {password}
            </div>
        </form>
    </div>
  )
}
