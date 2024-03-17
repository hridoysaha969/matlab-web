import CheckForm from "@/components/CheckForm";
import ResultForm from "@/components/ResultForm";
import classes from "@/styles/result.module.css";
function Result() {
  return (
    <div className="container">
      <CheckForm />
      <div className={classes.result__section}>
        <h2 className={classes.result__title}>Search your Result</h2>

        <div className={classes.result__container}>
          <div className={classes.result__header}>
            <p>Web Development</p>
            <span>Chandpur, Matlab South</span>
          </div>
          <div className={classes.result__body}>
            <ResultForm />
          </div>
        </div>

        <div className={classes.info__container}>
          <div className={classes.info__header}>
            <h2>Information</h2>
          </div>
          <div className={classes.info__body}>
            <ul>
              <li>Test Exam Full Mark 20</li>
              <li>Project Exam Full Mark 20</li>
              <li>Level Exam Full Mark 100</li>
              <li>For Matlab South only</li>
              <li>Available for Web Development Students only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
