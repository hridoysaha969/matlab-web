import classes from "@/styles/studentData.module.css";
import { Clear } from "@mui/icons-material";
import SuccessRate from "./SuccessRate";
import { useEffect } from "react";

function StudentData({ studentList, setIsOpened }) {
  return (
    <section className={classes.student__data}>
      <div className={classes.data__container}>
        <span className={classes.close} onClick={() => setIsOpened(false)}>
          {" "}
          <Clear />
        </span>
        <h3>Traine Information</h3>
        <div className={classes.basic_data}>
          <p>
            <span>Name : </span> <span>{studentList.studentName}</span>
          </p>
          <p>
            <span>Batch No. : </span> <span>{studentList.batchID}</span>
          </p>
          <p>
            <span>Roll : </span> <span>{studentList.roll}</span>
          </p>
          <p>
            <span>Student ID : </span> <span>{studentList.studentID}</span>
          </p>
          <p>
            <span>Class Activity : </span>{" "}
            <span>{studentList.classActivity} out of 10</span>
          </p>
        </div>
        <SuccessRate studentData={studentList} />
      </div>
    </section>
  );
}

export default StudentData;
