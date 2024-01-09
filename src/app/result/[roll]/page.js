"use client";
import classes from "@/styles/success.module.css";
import Image from "next/image";
import img from "../../../../public/web-logo.png";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { ref, get } from "firebase/database";

function page({ params }) {
  const [resultObj, setResultObj] = useState([]);
  const [singleStudent, setSingleStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentData() {
      const dataRef = ref(db, "studentList/CHA-MAT-WD-01");
      try {
        setLoading(true);
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).filter(
            ([id, value]) => value.roll === params.roll && { ...value }
          );
          await setSingleStudent(dataWithIds[0]);
          setLoading(false);
        } else {
          console.log("No data available");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    }

    fetchStudentData();
  }, []);

  useEffect(() => {
    async function fetchResult() {
      const rsltRef = ref(db, `results/${params.roll}/testExam`);
      try {
        const snapShot = await get(rsltRef);
        const result = Object.entries(snapShot.val()).map(([key, val]) => val);
        await setResultObj(result);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchResult();
  }, []);

  return !loading ? (
    <div className="container">
      <div className={classes.success__section}>
        <div className={classes.seccess__header}>
          <div className={classes.logo}>
            <h2>Web Development</h2>
            <Image src={img} width={80} height={80} alt="Web Logo" />
          </div>
          <div className={classes.details}>
            <p>Name : {singleStudent && singleStudent[1].studentName}</p>
            <p>Batch ID : {singleStudent && singleStudent[1].batchID}</p>
            <p>Roll : {params.roll}</p>
            <p>Student ID : {singleStudent && singleStudent[1].studentID}</p>
          </div>
        </div>
        <div className={classes.result__table}>
          <h3>Test Result</h3>
          <table>
            <thead>
              <tr>
                <th>#No.</th>
                <th>Exam Name</th>
                <th>Grade/Number</th>
              </tr>
            </thead>
            <tbody>
              {resultObj &&
                resultObj.map((res, ind) => (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{res.examName}</td>
                    <td>{res.resultNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={classes.result__table}>
          <h3>Project Result</h3>
          <table>
            <thead>
              <tr>
                <th>#No.</th>
                <th>Exam Name</th>
                <th>Grade/Number</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.invalid__feedback}>
                <td colSpan="3">Not published yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.result__table}>
          <h3>Level Result</h3>
          <table>
            <thead>
              <tr>
                <th>#No.</th>
                <th>Exam Name</th>
                <th>Grade/Number</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.invalid__feedback}>
                <td colSpan="3">Not published yet!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <p>Loading...</p>
    </div>
  );
}

export default page;
