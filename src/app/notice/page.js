"use client";
import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { ref, get } from "firebase/database";
import classes from "@/styles/noticeCard.module.css";
import Image from "next/image";
import hridoySaha from "../../../public/hridoy-saha.png";

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
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h2 className={classes.title}>Notice Board</h2>

      <div className={classes.notice__container}>
        {loading && <p>Loading</p>}

        {data.map((val, ind) => (
          <div className={classes.notice__card} key={ind}>
            <a href="/mentors" className={classes.card_header}>
              <Image
                src={hridoySaha}
                className={classes.card_header_img}
                width={50}
                height={50}
                alt="Hridoy Saha"
                priority
              />
              <div className={classes.card_header_text}>
                <h3 className={classes.card_header_title}>Hridoy Saha</h3>
                <span className={classes.card_header_title_subtitle}>
                  {`${getMonthFromDateString(val.date).getDate()} ${
                    months[getMonthFromDateString(val.date).getMonth()]
                  }, `}{" "}
                  {getMonthFromDateString(val.date).getFullYear()}{" "}
                </span>
              </div>
            </a>
            <div className={classes.card__body}>
              <p>{val.noticeText}</p>
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
