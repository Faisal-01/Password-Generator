import styles from "./complex.module.css";
import { useState } from "react";
import axios from "axios";

import Alert from "../Alert/alert";
import { useAppContext } from "@/app/context";

export default function Complex() {
  const [length, setLength] = useState(4);
  const [password, setPassword] = useState("");
  const [isDigits, setIsDigits] = useState(true);
  const [isCharacters, setIsCharacters] = useState(true);
  const [isSpecial, setIsSpecial] = useState(true);

  const [passwordFor, setPasswordFor] = useState("");

    const { alert, setAlert } = useAppContext();

  const generateHandler = () => {
   
    setPassword("");
    // const numberOfDigits = 2;
    // const numberOfSpecial 
    // const numberOfCharacters = length - numberOfDigits;
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    const special = "!@#$%^&*";

    if(isCharacters && !isDigits && !isSpecial){
      const numberOfCharacters = length;


      for (let i = 0; i < numberOfCharacters; i++) {
        setPassword((prev) => {
          return (prev +=
            alphabets[Math.floor(Math.random() * alphabets.length)]);
        });
      }
    }
    else if (!isCharacters && isDigits && !isSpecial) {
      const numberOfDigits = length;

      for (let i = 0; i < numberOfDigits; i++) {
        setPassword((prev) => {
          return (prev +=
            numbers[Math.floor(Math.random() * numbers.length)]);
        });
      }
    } 
    else if (!isCharacters && !isDigits && isSpecial) {
      const numberOfSpecial = length;

      for (let i = 0; i < numberOfSpecial; i++) {
        setPassword((prev) => {
          return (prev += special[Math.floor(Math.random() * special.length)]);
        });
      }
    } 
    else if (isCharacters && !isDigits && isSpecial) {
      const numberOfCharacters = Math.floor(Math.random() * length);

      const numberOfSpecial = length - numberOfCharacters;

      for (let i = 0; i < numberOfCharacters; i++) {
        setPassword((prev) => {
          return (prev +=
            alphabets[Math.floor(Math.random() * alphabets.length)]);
        });
      }

      for (let i = 0; i < numberOfSpecial; i++) {
        setPassword((prev) => {
          return (prev += special[Math.floor(Math.random() * special.length)]);
        });
      }
    } 
    else if (isCharacters && isDigits && !isSpecial) {
      const numberOfCharacters = Math.floor(Math.random() * length);

      const numberOfDigits = length - numberOfCharacters;

      for (let i = 0; i < numberOfCharacters; i++) {
        setPassword((prev) => {
          return (prev +=
            alphabets[Math.floor(Math.random() * alphabets.length)]);
        });
      }

      for (let i = 0; i < numberOfDigits; i++) {
        setPassword((prev) => {
          return (prev += numbers[Math.floor(Math.random() * special.length)]);
        });
      }
    } 
    else if (!isCharacters && isDigits && isSpecial) {
      const numberOfSpecial = Math.floor(Math.random() * length);

      const numberOfDigits = length - numberOfSpecial;

      for (let i = 0; i < numberOfSpecial; i++) {
        setPassword((prev) => {
          return (prev +=
            special[Math.floor(Math.random() * special.length)]);
        });
      }

      for (let i = 0; i < numberOfDigits; i++) {
        setPassword((prev) => {
          return (prev += numbers[Math.floor(Math.random() * special.length)]);
        });
      }
    } else {
      const numberOfCharacters = Math.floor(Math.random() * length);
      const numberOfDigits = Math.floor(
        Math.random() * (length - numberOfCharacters)
      );
      const numberOfSpecial = length - (numberOfDigits + numberOfCharacters);

      for (let i = 0; i < numberOfCharacters; i++) {
        setPassword((prev) => {
          return (prev +=
            alphabets[Math.floor(Math.random() * alphabets.length)]);
        });
      }

      for (let i = 0; i < numberOfDigits; i++) {
        setPassword((prev) => {
          return (prev += numbers[Math.floor(Math.random() * numbers.length)]);
        });
      }

      for (let i = 0; i < numberOfSpecial; i++) {
        setPassword((prev) => {
          return (prev += special[Math.floor(Math.random() * special.length)]);
        });
      }
    }

    
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user");

    try {
      const response = await axios.post(`/api/user/${userId}`, {
        password: password,
        passwordType: "Complex",
        for: passwordFor,
      });

      setPassword("");
      setPasswordFor("");
      setAlert({status: true, message: "Saved Successfully"});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Complex Password Generator</h1>

      <form className={styles.generatorContainer} onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <label htmlFor="length">Enter Length:</label>

          <input
            type="number"
            min={4}
            max={16}
            id="length"
            required
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <ul className={styles.options}>
          <li className={styles.option}>
            <label htmlFor="number">Number?</label>

            <input
              type="checkbox"
              id="number"
              checked={isDigits}
              onChange={(e) => setIsDigits(e.target.checked)}
            />
          </li>

          <li className={styles.option}>
            <label htmlFor="characters">Characters?</label>

            <input
              type="checkbox"
              id="characters"
              checked={isCharacters}
              onChange={(e) => setIsCharacters(e.target.checked)}
            />
          </li>

          <li className={styles.option}>
            <label htmlFor="special">Special Characters?</label>

            <input
              type="checkbox"
              id="special"
              checked={isSpecial}
              onChange={(e) => setIsSpecial(e.target.checked)}
            />
          </li>
        </ul>

        <button
          type="button"
          onClick={generateHandler}
          className={styles.button}
        >
          Generate
        </button>
        <div className={styles.output}>{password}</div>

        {password && (
          <>
            <div className={styles.forContainer}>
              <label htmlFor="for">For:</label>

              <input
                type="text"
                id="for"
                name="for"
                value={passwordFor}
                onChange={(e) => setPasswordFor(e.target.value)}
              />
            </div>
            <button className={styles.button}>Save</button>
          </>
        )}
      </form>
      {alert.status && <Alert />}
    </div>
  );
}
