import React from "react";
import classes from "@/styles/mentors.module.css";
import Image from "next/image";
import hridoySaha from "../../../public/hridoy-saha.png";
import { Star, Verified } from "@mui/icons-material";
import NewsFeed from "@/components/NewsFeed";

function Mentors() {
  return (
    <section className={classes.mentors_section}>
      <div className={classes.profile_header}>
        <Image
          src={hridoySaha}
          className={classes.profile_image}
          width={300}
          alt="Hridoy Saha"
        />

        <div className={classes.profile_text}>
          <h2 className={classes.profile_title}>
            Hridoy Saha{" "}
            <span className={classes.verified}>
              <Verified />
            </span>
          </h2>
          <span className={classes.profile_subtitle}>
            Full Stack Developer | Mentor
          </span>
          <div className={classes.profile_stars}>
            <span>Rating :</span>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>
      </div>
      <NewsFeed />
    </section>
  );
}

export default Mentors;
