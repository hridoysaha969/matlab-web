"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "@/styles/rewardPage.module.css";
import { Email, Language, Person, Tag } from "@mui/icons-material";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import PdfBtn from "@/components/PdfBtn";

const items = [
  {
    title: "Whate are those reward?",
    content:
      "There are three types of reward. One is free for all users, another will be provided after scoring remarkable point and the last one will be provided after achieving success on freelancing.",
  },
  {
    title: "Who is this reward for?",
    content:
      "Free rewards are available for all students or anyone who visit this website. Other reward are only for Her Power Project trainee",
  },
  {
    title: "How can I get this?",
    content:
      "You have to get admitted into Her Power Project Web Development batch. Provide all the necessaries and legal information. Complete full course and get those rewards",
  },
  {
    title: "Is there any other way to get this?",
    content:
      "You have to purchase our premium membership of 'Matlab Web' and you can get all the access of this course.",
  },
  {
    title: "How can I purchase premium membership?",
    content:
      "This feature is not available right now. We are working on it, the feature will be available soon. Stay with us.",
  },
];

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

          <div className={classes.resource__container}>
            <h2 className={classes.faq}>
              Get <span>Resources</span>
            </h2>

            <div className={classes.resource__tab}>
              <p>
                Here is your Ultimate resources of Web Design and Development
                journey. Hope that it will help you to become successfull.{" "}
              </p>
              <div className={classes.btn__wrap}>
                <PdfBtn />
              </div>
            </div>
          </div>

          <div>
            <h2 className={classes.faq}>
              F<span>A</span>Q
            </h2>
            <Accordion items={items} />
          </div>

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
