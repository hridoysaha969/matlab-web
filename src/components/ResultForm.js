"use client";
import classes from "@/styles/result.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ResultForm() {
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleChange = (e) => {
    setRoll(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roll) {
      setError("Please enter a valid roll");
    } else {
      if (parseInt(roll) < 10) {
        // Check if it starts with "0"
        if (roll.charAt(0) !== "0") {
          setError("Please add '0' before your roll");
        } else {
          e.target.reset();
          setRoll("");
          push(`/result/${roll}`);
        }
      } else {
        e.target.reset();
        setRoll({ sRoll: "" });
        push(`/result/${roll}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={classes.input__wrap}>
        Enter your Roll
        <input
          type="number"
          name="sRoll"
          value={roll}
          placeholder="valid roll (1-20)"
          onChange={handleChange}
        />
      </label>
      {error && <p className={classes.invalid__feedback}>{error}</p>}
      <button type="submit" className={classes.search__btn}>
        Search
      </button>
    </form>
  );
}

export default ResultForm;
