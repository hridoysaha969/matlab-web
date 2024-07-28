"use client";
import { useState } from "react";
import { db } from "@/config/firebase";
import { getDatabase, push, ref } from "firebase/database";
import classes from "@/styles/dashboard.module.css";

function StudentDataEntry() {
  const [studentData, setStudentData] = useState({
    batchID: "",
    roll: "",
    studentName: "",
    studentID: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    const { batchID, roll, studentName, studentID } = studentData;
    e.preventDefault();
    if (!batchID || !roll || !studentName || !studentID) {
      setError("PLease fill all the field");
    } else {
      try {
        setLoading(true);
        const stdentRef = ref(db, `studentList/${studentData.batchID}`);
        await push(stdentRef, studentData);

        e.target.reset();
        setStudentData({
          batchID: "",
          roll: "",
          studentName: "",
          studentID: "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };
  return (
    <form className={classes.student__data_form} onSubmit={handleSubmit}>
      <h3>Student Info</h3>
      <div className={classes.grid__wrap}>
        <div className={classes.flex__input}>
          <label>Batch ID</label>
          <select name="batchID" onChange={handleChange}>
            <option>Select One</option>
            <option value="CHA-MAT-WD-01">CHA-MAT-WD-01</option>
          </select>
        </div>
        <div className={classes.flex__input}>
          <label>Roll</label>
          <input
            type="number"
            name="roll"
            value={studentData.roll}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.grid__wrap}>
        <div>
          <label className={classes.flex__input}>
            Student Name
            <input
              type="text"
              name="studentName"
              value={studentData.studentName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className={classes.flex__input}>
            Student ID
            <input
              type="number"
              name="studentID"
              value={studentData.studentID}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <button type="submit" className={classes.submit__btn} disabled={loading}>
        Submit
      </button>
      {error && <h4 className={classes.invalid__feedback}>{error}</h4>}
    </form>
  );
}

export default StudentDataEntry;
