"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import classes from "@/styles/student.module.css";
import { get, ref } from "firebase/database";

function Students() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStudentData() {
      const sDataRef = ref(db, "studentList/CHA-MAT-WD-01");

      try {
        setLoading(true);
        const snapshot = await get(sDataRef);
        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).map(
            ([id, value]) => ({ dataId: id, ...value })
          );
          setStudentList(dataWithIds);
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

  return (
    <div className={classes.students}>
      <h2 className={classes.students__title}>Students</h2>

      <div className={classes.student__list}>
        {studentList.length !== 0 && !loading ? (
          studentList.map((stdnt, ind) => (
            <div key={ind} className={classes.student__card}>
              <h4 className={classes.s__name}>{stdnt.studentName}</h4>
              <p className={classes.batch__id}>Batch ID : {stdnt.batchID}</p>
              <p className={classes.batch__id}>Roll : {stdnt.roll}</p>
              <div className={classes.footer}>
                <span>Student ID : {stdnt.studentID}</span>
                <span>Point : 0</span>
              </div>
            </div>
          ))
        ) : (
          <p>No Data found</p>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Students;
