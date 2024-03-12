import classes from "@/styles/updatestudent.module.css";
import { useState } from "react";
import { ref, update } from "firebase/database";
import { db } from "@/config/firebase";
import SuccessPopUp from "./SuccessPopUp";

function UpdateStudent({ setUpdate, studentData }) {
  const [currData, setCurrData] = useState({
    batchID: studentData.batchID,
    roll: studentData.roll,
    studentName: studentData.studentName,
    studentID: studentData.studentID,
    classActivity: studentData.classActivity ? studentData.classActivity : "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCurrData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateDataRef = ref(
      db,
      `studentList/CHA-MAT-WD-01/${studentData.dataId}`
    );

    try {
      setLoading(true);
      await update(updateDataRef, currData);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <div className={classes.content_wrapper}>
      <SuccessPopUp
        message="Data updated successfully!"
        setSuccess={setSuccess}
        success={success}
      />
      <div className={classes.content}>
        <form className={classes.content_form}>
          <div className={classes.input__wrap}>
            <input
              type="text"
              name="studentName"
              placeholder="Name"
              onChange={handleChange}
              value={currData.studentName}
            />
            <input
              type="number"
              name="roll"
              placeholder="Roll"
              onChange={handleChange}
              value={currData.roll}
            />
            <input
              type="number"
              name="studentID"
              placeholder="Student ID"
              onChange={handleChange}
              value={currData.studentID}
            />
            <input
              type="text"
              name="batchID"
              placeholder="Batch ID"
              onChange={handleChange}
              value={currData.batchID}
            />
            <input
              type="number"
              name="classActivity"
              placeholder="Class Activity"
              onChange={handleChange}
              value={currData.classActivity}
            />
          </div>

          <button
            className={classes.update__btn}
            type="submit"
            onClick={handleUpdate}
            disabled={loading}
          >
            Update
          </button>

          <button
            className={classes.cancel__btn}
            onClick={() => setUpdate(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
