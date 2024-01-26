import classes from "@/styles/notice.module.css";
import { push, ref } from "firebase/database";
import { useState } from "react";
import { db } from "@/config/firebase";

function Notice() {
  const [notice, setNotice] = useState({
    noticeText: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notice.noticeText) {
      setError("Please write something");
    } else {
      try {
        const currentDate = new Date();
        setLoading(true);
        const noticeRef = ref(db, "notices");
        await push(noticeRef, { ...notice, date: currentDate.toISOString() });
        setNotice({
          noticeText: "",
          date: "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className={classes.notice__container}>
      <div className="container">
        <h2 className={classes.notice__title}>Add Notice</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.input__wrap}>
            <label>Add notice</label>
            <textarea
              name="notice"
              cols="5"
              rows="3"
              value={notice.noticeText}
              onChange={(e) => {
                setNotice({
                  ...notice,
                  noticeText: e.target.value,
                });
                setError("");
              }}
              placeholder="Enter your message"
            />
          </div>
          {error && <p className={classes.invalid__feedback}>{error}</p>}
          <button
            type="submit"
            className={classes.btn__submit}
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Notice;
