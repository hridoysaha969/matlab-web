"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import classes from "@/styles/student.module.css";
import { get, ref } from "firebase/database";
import { ArrowForward, BorderColor } from "@mui/icons-material";
import StudentData from "./StudentData";
import { auth } from "@/config/firebase";
import UpdateStudent from "./UpdateStudent";

function Students() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [update, setUpdate] = useState(false);

  // State to store the clicked value
  const [clickedValue, setClickedValue] = useState(null);

  const handleClick = (value) => {
    setIsOpened(true);
    setClickedValue(value);
  };

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

    auth.onAuthStateChanged((user) => {
      user ? setAdmin(true) : setAdmin(false);
    });

    fetchStudentData();
  }, []);

  return (
    <div className={classes.students}>
      <h2 className={classes.students__title}>
        Our <span>Traine</span>
      </h2>

      <div className={classes.student__list}>
        {studentList.length !== 0 && !loading ? (
          studentList.map((stdnt, ind) => (
            <div key={ind} className={classes.student__card}>
              <h3 className={classes.roll__tag}>{stdnt.roll}</h3>
              <h4 className={classes.s__name}>{stdnt.studentName}</h4>
              <button
                className={classes.view__btn}
                onClick={() => handleClick(stdnt)}
              >
                View More <ArrowForward />
              </button>
              {isOpened && !loading ? (
                <StudentData
                  studentList={clickedValue}
                  setIsOpened={setIsOpened}
                />
              ) : null}
              {update ? (
                <UpdateStudent
                  setUpdate={setUpdate}
                  studentData={clickedValue}
                />
              ) : null}
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
