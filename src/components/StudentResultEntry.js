import classes from "@/styles/resultEntry.module.css";
import { useState } from "react";
import { db } from "@/config/firebase";
import { get, push, ref } from "firebase/database";

function StudentResultEntry() {
  const [resultData, setResultData] = useState({
    examType: "",
    examName: "",
    resultNumber: "",
    studentRoll: "",
  });
  // const [infoAdded, setInfoAdded] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResultData({
      ...resultData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // const addInfo = async () => {
  //   const dataRef = ref(db, "studentList/CHA-MAT-WD-01");
  //   try {
  //     setLoading(true);
  //     const snapshot = await get(dataRef);
  //     if (snapshot.exists()) {
  //       const dataWithIds = Object.entries(snapshot.val()).filter(
  //         ([id, value]) =>
  //           value.roll === resultData.studentRoll && { dataId: id, ...value }
  //       );
  //       setResultData({ ...resultData, sInfo: dataWithIds[0][1] });
  //       setInfoAdded("Data Added Successfully");
  //       setLoading(false);
  //     } else {
  //       console.log("No data available");
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     setInfoAdded(err.message);
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { examType, examName, resultNumber, studentRoll } = resultData;
    if (!examType || !examName || !resultNumber || !studentRoll) {
      setError("Please All The Data");
    } else {
      try {
        setLoading(true);
        // const sInfoRef = ref(db, `results/${resultData.studentRoll}`);
        const examRef = ref(
          db,
          `results/${resultData.studentRoll}/${resultData.examType}`
        );
        await push(examRef, {
          examName: resultData.examName,
          resultNumber: resultData.resultNumber,
        });

        e.target.reset();
        setResultData({
          examType: "",
          examName: "",
          resultNumber: "",
          studentRoll: "",
        });
        // setInfoAdded("");
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      }
    }
  };
  return (
    <form className={classes.result__entry_form} onSubmit={handleSubmit}>
      <h3>Result Entry</h3>
      <div className={classes.check__btns}>
        <label>
          <input
            type="radio"
            name="examType"
            value="testExam"
            checked={resultData.examType === "testExam"}
            onChange={handleChange}
          />
          Test Exam
        </label>
        <label>
          <input
            type="radio"
            name="examType"
            value="project"
            checked={resultData.examType === "project"}
            onChange={handleChange}
          />
          Project
        </label>
        <label>
          <input
            type="radio"
            name="examType"
            value="levelExam"
            checked={resultData.examType === "levelExam"}
            onChange={handleChange}
          />
          Level Exam
        </label>
      </div>
      <div className={classes.input__wrap}>
        <div className={classes.select__input}>
          <label>Exam Name</label>
          <input
            type="text"
            name="examName"
            value={resultData.examName}
            onChange={handleChange}
          />
        </div>
        <div className={classes.number__input}>
          <label>Student Roll</label>
          <input
            type="number"
            name="studentRoll"
            value={resultData.studentRoll}
            onChange={handleChange}
          />
        </div>
        <div className={classes.number__input}>
          <label>Number</label>
          <input
            type="number"
            name="resultNumber"
            value={resultData.resultNumber}
            onChange={handleChange}
          />
        </div>
        {/* <div className={classes.info__add}>
          <button
            type="button"
            className={classes.infoAdd__btn}
            onClick={addInfo}
            disabled={loading}
          >
            Add info
          </button>
          {infoAdded && <p className={classes.data__failed}>{infoAdded}</p>}
        </div> */}
      </div>
      <button type="submit" className={classes.publish__btn} disabled={loading}>
        Publish
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default StudentResultEntry;
