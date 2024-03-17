import Banner from "@/components/Banner";
import dynamic from "next/dynamic";
import classes from "@/styles/countdown.module.css";
import { ArrowForward } from "@mui/icons-material";

const DynamicCountdownTimer = dynamic(
  () => import("../components/CountdownTimer"),
  { ssr: false }
);

import ImageSlider from "@/components/ImageSlider";
import Reward from "@/components/Reward";
import Students from "@/components/Student";
import Link from "next/link";

export default function Home() {
  const targetDate = new Date("2024-03-17T17:59:59");
  return (
    <div className="container">
      <div className={classes.timer__wrapper}>
        {/* <h3 className={classes.timer__title}>Registration is in progress</h3> */}
        <DynamicCountdownTimer targetDate={targetDate} />
        <Link href="/registration" className={classes.timer__link}>
          Apply Now <ArrowForward />
        </Link>
      </div>
      <Banner />
      <ImageSlider />
      <Reward />
      <Students />
    </div>
  );
}
