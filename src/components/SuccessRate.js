"use client";
import classes from "@/styles/studentData.module.css";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { get, ref } from "firebase/database";

function SuccessRate({ studentData }) {
  const [totalNum, setTotalNum] = useState({
    tNum: 0,
    eCount: 0,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchStudentData() {
      const sDataRef = ref(db, `results/${studentData.roll}/testExam`);

      try {
        setLoading(true);
        const snapshot = await get(sDataRef);
        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).map(
            ([id, value]) => value
          );
          let total = 0;
          dataWithIds.forEach(
            (val, ind) => (total = total + parseInt(val.resultNumber))
          );
          setTotalNum({
            tNum: total,
            eCount: dataWithIds.length,
          });
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
    <div className={classes.success_wrapper}>
      <div className={classes.success_rate}>
        {Math.floor((totalNum.tNum / (totalNum.eCount * 20)) * 100)}%
      </div>
      <p>Success Rate!</p>
    </div>
  );
}

export default SuccessRate;
