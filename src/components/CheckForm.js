"use client";
import classes from "@/styles/result.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CheckForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleClick = (e) => {
    if (!username) {
      setError("Please enter a valid roll");
    } else {
      setUsername("");
      push(`/result/00/${username}`);
      console.log(`/result/00/${username}`);
    }
  };

  return (
    <div className={classes.check__status}>
      <h2>Check Your Overall Status</h2>

      <div className={classes.check__form__wrapper}>
        <input
          type="text"
          value={username}
          placeholder="@username"
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          className={error && classes.invalid}
        />
        <button onClick={handleClick}>Check</button>
      </div>
    </div>
  );
}

export default CheckForm;
