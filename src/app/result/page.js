import CheckForm from "@/components/CheckForm";
import ResultForm from "@/components/ResultForm";
import classes from "@/styles/result.module.css";
function Result() {
  return (
    <div className="container">
      <h2 className={classes.all_result_title}>
        <span>All</span> Result
      </h2>
      <div className={classes.form_layout}>
        <CheckForm />
        <div className={classes.result__section}>
          <div className={classes.result__container}>
            <div className={classes.result__header}>
              <p>Course result</p>
              <span>Web Development</span>
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
                <li>Her Power Project, CHA-MAT-WD-01</li>
                <li>Sign up to find result</li>
                <li>
                  Contact{" "}
                  <a href="mailto:hridoysaha969@gmail.com">
                    hridoysaha969@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
