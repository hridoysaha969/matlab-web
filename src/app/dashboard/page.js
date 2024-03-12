"use client";
import AddImage from "@/components/AddImage";
import Notice from "@/components/Notice";
import StudentDataEntry from "@/components/StudentDataEntry";
import StudentResultEntry from "@/components/StudentResultEntry";
import classes from "@/styles/dashboard.module.css";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const [resultMood, setResultMood] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      Cookies.remove("7uDFVrhs6");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

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

      <button className={classes.sign__out} onClick={handleSignOut}>
        Signout
      </button>
    </div>
  );
}

export default Dashboard;
