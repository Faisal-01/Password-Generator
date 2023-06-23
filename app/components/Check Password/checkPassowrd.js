import styles from "./checkPassword.module.css";
import { useState, useRef } from "react";

export default function CheckPassowrd() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const strengthRef = useRef(null);

  function checkPasswordStrength(password) {
    // Define the criteria for password strength
    var minLength = 8; // Minimum length requirement
    var minUppercase = 1; // Minimum uppercase letters requirement
    var minLowercase = 1; // Minimum lowercase letters requirement
    var minNumbers = 1; // Minimum numbers requirement
    var minSpecialChars = 1; // Minimum special characters requirement

    // Evaluate the password based on each criteria
    var strength = 0;

    // Check length
    if (password.length >= minLength) {
      strength++;
    }

    // Check uppercase letters
    var uppercaseRegex = /[A-Z]/g;
    if (
      password.match(uppercaseRegex) &&
      password.match(uppercaseRegex).length >= minUppercase
    ) {
      strength++;
    }

    // Check lowercase letters
    var lowercaseRegex = /[a-z]/g;
    if (
      password.match(lowercaseRegex) &&
      password.match(lowercaseRegex).length >= minLowercase
    ) {
      strength++;
    }

    // Check numbers
    var numbersRegex = /[0-9]/g;
    if (
      password.match(numbersRegex) &&
      password.match(numbersRegex).length >= minNumbers
    ) {
      strength++;
    }

    // Check special characters
    var specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
    if (
      password.match(specialCharsRegex) &&
      password.match(specialCharsRegex).length >= minSpecialChars
    ) {
      strength++;
    }

    // Determine the strength label
    if (strength === 2) {
      setStrength("Weak");
    } else if (strength === 3) {
      setStrength("Medium");
    } else if (strength >= 4) {
      setStrength("Strong");
    } else {
      setStrength("Very Weak")
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    checkPasswordStrength(password);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Strength Checker</h1>

      <form className={styles.generatorContainer} onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Enter Password</label>

          <input
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Check
        </button>
        {strength && (
          <div
            className={styles.output}
            ref={strengthRef}
            style={{
              color:
                strength === "Strong"
                  ? "Green"
                  : strength === "Medium"
                  ? "Blue"
                  : "Red",
            }}
          >
            {strength}
          </div>
        )}
      </form>
    </div>
  );
}
