"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "@/styles/rewardPage.module.css";
import { Email, Language, Person, Tag } from "@mui/icons-material";
import Link from "next/link";

function Reward({ params }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (params.reward) {
      setLoading(false);
    }
  }, []);
  const videoURL = `https://www.youtube.com/watch?v=${params.reward}`;
  return (
    <>
      {!loading && (
        <div className="container">
          <div className={classes.video__player}>
            <ReactPlayer
              url={videoURL}
              controls={true}
              width="640px"
              height="360px"
              playing={!loading}
              config={{
                youtube: {
                  playerVars: {
                    origin: window.location.origin,
                  },
                },
              }}
            />
          </div>

          <div className={classes.note}>
            <h3>What will you get?</h3>
            <ul className={classes.reward__list}>
              <li>Responsive & animated Portfolio website</li>
              <li>Love Calculator</li>
              <li>Password Generator</li>
              <li>
                ToDo App <span>Only elegible student will get this.</span>
              </li>
            </ul>
          </div>

          <div></div>

          <div className={classes.about__mentor}>
            <h2 className={classes.title}>About Admin</h2>
            <p className={classes.name}>
              <Person /> <span>Hridoy Saha</span>
            </p>
            <p className={classes.category}>
              <Tag /> <span>Web & App Developer</span>
            </p>
            <p className={classes.email}>
              <Email /> <span>hridoysaha969@gmail.com</span>
            </p>
            <p className={classes.website}>
              <Language />{" "}
              <Link href="https://borntocode.netlify.com/">hridoysaha.com</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Reward;
