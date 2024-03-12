import classes from "@/styles/updatestudent.module.css";
import UpdateBtn from "./UpdateBtn";
import { useState } from "react";

function UpdateStudent({ setUpdate, studentData }) {
  const [currData, setCurrData] = useState({
    batchID: studentData.batchID,
    roll: studentData.roll,
    studentName: studentData.studentName,
    studentID: studentData.studentID,
    classActivity: studentData.classActivity ? studentData.classActivity : "",
  });

  const handleChange = (e) => {
    setCurrData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={classes.content_wrapper}>
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
              type="text"
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

          <UpdateBtn studentData={studentData} />
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
