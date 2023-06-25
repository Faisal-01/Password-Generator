import styles from './simple.module.css';
import { useState } from 'react';
import axios from 'axios';
import Alert from '../Alert/alert';
import { useAppContext } from '@/app/context';

export default function Simple() {

    const [length, setLength] = useState(4);
    const [password, setPassword] = useState("");
    const [passwordFor, setPasswordFor] = useState("");

    const {alert, setAlert} = useAppContext();

    const generateHandler = () => {
        // e.preventDefault()
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
            return (prev += alphabets[Math.floor(Math.random() * 26)]);
          });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user");

        try{
            const response = await axios.post(`/api/user/${userId}`, {
                password: password,
                passwordType: "Simple",
                for: passwordFor

            })

            setPassword("")
            setPasswordFor("")
            setAlert({
              status: true,
              message: "Saved Successfully",
            });
        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simple Password Generator</h1>

      <form className={styles.generatorContainer} onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <label htmlFor="length">Enter Length:</label>

          <input
            type="number"
            min={4}
            max={10}
            id="length"
            required
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <button type="button" className={styles.button} onClick={generateHandler}>
          Generate
        </button>
        <div className={styles.output}>{password}</div>

        {password && (
          <>
            <div className={styles.forContainer}>
              <label htmlFor="for">For:</label>

              <input type="text" id="for" name="for" value={passwordFor} onChange={e => setPasswordFor(e.target.value)}/>
            </div>
            <button className={styles.button} type='submit'>Save</button>
          </>
        )}
      </form>
      {alert.status && <Alert />}
    </div>
  );
}
