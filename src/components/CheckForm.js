"use client";
import classes from "@/styles/result.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CheckForm() {
  const [username, setUsername] = useState("");
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleClick = (e) => {
    if (!username || !roll) {
      setError("Please enter a valid roll or username");
    } else {
      setUsername("");
      setRoll("");
      push(`/result/${roll}/${username}`);
      console.log(`/result/${roll}/${username}`);
    }
  };

  return (
    <div className={classes.check__status}>
      <h2>Profile</h2>

      <div className={classes.check__form__wrapper}>
        <label className={classes.form_check_label}>
          Username
          <input
            type="text"
            value={username}
            placeholder="e.g. john123"
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className={error && classes.invalid}
          />
        </label>

        <label className={classes.form_check_label}>
          Roll
          <input
            type="number"
            value={roll}
            placeholder="valid roll (1-20)"
            onChange={(e) => {
              setRoll(e.target.value);
              setError("");
            }}
            className={error && classes.invalid}
          />
        </label>

        <button onClick={handleClick}>Check</button>
      </div>
    </div>
  );
}

export default CheckForm;
