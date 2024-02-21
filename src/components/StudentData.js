import classes from "@/styles/studentData.module.css";
import { Clear } from "@mui/icons-material";

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
            <span>Class Activity : </span> <span>N/A</span>
          </p>
        </div>
        <div className={classes.success_wrapper}>
          <div className={classes.success_rate}>0%</div>
          <p>Success Rate!</p>
        </div>
      </div>
    </section>
  );
}

export default StudentData;
