"use client";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { ref, get } from "firebase/database";
import classes from "@/styles/noticeCard.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Notice() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const noticeRef = ref(db, "notices");
        const snapshot = await get(noticeRef);
        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).map(
            ([id, value]) => ({ dataId: id, ...value })
          );
          setData(dataWithIds.reverse());
          setLoading(false);
        } else {
          console.log("No data available");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h2 className={classes.title}>Notice Board</h2>

      <div className={classes.notice__container}>
        {loading && <p>Loading</p>}
        {data.reverse().map((val, ind) => (
          <div className={classes.notice__card} key={ind}>
            <div className={classes.card__body}>
              <p>{val.noticeText}</p>
            </div>
            <div className={classes.card__footer}>
              <span>
                {`${getMonthFromDateString(val.date).getDate()} ${
                  months[getMonthFromDateString(val.date).getMonth()]
                }, `}{" "}
                {getMonthFromDateString(val.date).getFullYear()}{" "}
              </span>
              <span>by Hridoy Saha</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getMonthFromDateString = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject;
};

export default Notice;
