"use client";
import React, { useEffect, useState } from "react";
import classes from "@/styles/mentors.module.css";
import { Language, LocationOn, Mail } from "@mui/icons-material";
import StarRating from "./StarRating";
import { push, ref, get } from "firebase/database";
import { db } from "@/config/firebase";
import Spinner from "./Spinner";

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

function NewsFeed() {
  const [text, setText] = useState({
    userName: "",
    message: "",
  });
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reviewRef = ref(db, "reviews");
        const snapshot = await get(reviewRef);

        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).map(
            ([id, value]) => ({ dataId: id, ...value })
          );
          setReviews(dataWithIds);
          setLoading(false);
        } else {
          console.log("No data available");
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  console.log(reviews);

  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      rating < 1 ||
      !text.message ||
      !text.userName ||
      text.userName.length > 20
    ) {
      setError("Please select rating and write review");
      console.log("Please select rating and write review");
    } else {
      const newData = {
        ...text,
        onRating: rating,
      };
      try {
        const currentDate = new Date();
        setLoading(true);
        const reviewRef = ref(db, "reviews");
        await push(reviewRef, { ...newData, date: currentDate.toISOString() });
        setText({
          userName: "",
          message: "",
        });
        setRating(0);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
      console.log(newData);

      setText({
        userName: "",
        message: "",
      });
    }
  };
  return (
    <div className={classes.newsfeed_wrapper}>
      <aside className={classes.sideber}>
        <h3>About</h3>
        <p>
          A passionate Full Stack Web Developer with 5 years of valuable
          experience.
        </p>

        <ul className={classes.about_list}>
          <li className={classes.about_list_item}>
            <LocationOn /> Balakhal-3611, Hajiganj
          </li>
          <li className={classes.about_list_item}>
            {" "}
            <Mail /> hridoysaha969@gmail.com
          </li>
          <li className={classes.about_list_item}>
            <Language /> b2c.com
          </li>
        </ul>
      </aside>
      <article className={classes.contents}>
        <div className={classes.content_tab}>
          <h3>Reviews</h3>
        </div>

        <div className={classes.review_container}>
          {loading && <Spinner />}
          {/* <div className={classes.review}>
            <div className={classes.review_profile}>
              <div className={classes.display}>H</div>
              <div className={classes.display_text}>
                <h3>Hridoy Saha</h3>
                <span>23 July, 2024</span>
              </div>
            </div>

            <p className={classes.review_text}>
              Such great mentor. Communicative and skill-full mentor I have ever
              seen
            </p>
          </div> */}

          {reviews.length !== 0 ? (
            reviews.map((review, ind) => (
              <div className={classes.review} key={ind}>
                <div className={classes.review_profile}>
                  <div className={classes.display}>
                    {review.userName.charAt(0)}
                  </div>
                  <div className={classes.display_text}>
                    <h3>
                      {review.userName}
                      <StarRating
                        totalStar={5}
                        initialRating={review.onRating}
                        readOnly
                      />
                    </h3>
                    <span className={classes.review_date}>
                      {`${getMonthFromDateString(review.date).getDate()} ${
                        months[getMonthFromDateString(review.date).getMonth()]
                      }, `}{" "}
                      {getMonthFromDateString(review.date).getFullYear()}{" "}
                    </span>
                  </div>
                </div>

                <p className={classes.review_text}>{review.message}</p>
              </div>
            ))
          ) : (
            <div className={classes.no_data}></div>
          )}
        </div>

        <div className={classes.review_submit_container}>
          <h2 className={classes.submit_title}>Submit a review</h2>

          <StarRating onRating={setRating} />

          <div className={classes.review_message}>
            <input
              className={classes.user_name}
              value={text.userName}
              onChange={handleChange}
              name="userName"
              placeholder="Your Name"
            />
            <textarea
              rows={3}
              cols={10}
              placeholder="Write a feedback"
              value={text.message}
              onChange={handleChange}
              name="message"
            />

            <div className={classes.error_message}>{error}</div>
            <button
              className={classes.btn_submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

const getMonthFromDateString = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject;
};

export default NewsFeed;
