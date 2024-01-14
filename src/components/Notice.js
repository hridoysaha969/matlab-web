import classes from "@/styles/notice.module.css";
import { useState } from "react";

function Notice() {
  const [notice, setNotice] = useState("");
  return (
    <div className={classes.notice__container}>
      <div className="container">
        <h2 className={classes.notice__title}>Add Notice</h2>
        <form>
          <div className={classes.input__wrap}>
            <label>Add notice</label>
            <textarea
              name="notice"
              cols="5"
              rows="3"
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              placeholder="Enter your message"
            />
          </div>
          <button type="submit" className={classes.btn__submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Notice;
