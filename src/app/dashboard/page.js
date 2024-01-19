"use client";
import AddImage from "@/components/AddImage";
import Notice from "@/components/Notice";
import StudentDataEntry from "@/components/StudentDataEntry";
import StudentResultEntry from "@/components/StudentResultEntry";
import classes from "@/styles/dashboard.module.css";
import { useState } from "react";

function Dashboard() {
  const [resultMood, setResultMood] = useState(false);
  return (
    <div className="container">
      <h1 className={classes.dash__title}>Admin Dashboard</h1>

      <div className={classes.tab__btn}>
        <button
          className={classes.data__btn}
          onClick={() => setResultMood(false)}
        >
          Student Data Entry
        </button>
        <button
          className={classes.result__btn}
          onClick={() => setResultMood(true)}
        >
          Student Result Entry
        </button>
      </div>

      {resultMood ? <StudentResultEntry /> : <StudentDataEntry />}
      <Notice />
      <AddImage />
    </div>
  );
}

export default Dashboard;
