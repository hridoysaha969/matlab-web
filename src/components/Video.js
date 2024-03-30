import classes from "@/styles/video.module.css";
import { ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

function Video({ videoData }) {
  return (
    <div className={classes.video}>
      <Image
        src={`https://img.youtube.com/vi/${videoData.videoId}/maxresdefault.jpg`}
        className={classes.thumb__img}
        width={100}
        height={100}
        alt={videoData.title}
        priority={true}
      />
      <div className={classes.video__body}>
        <h4>{videoData.title}</h4>
        <Link
          href={`/${videoData.videoId}`}
          className={`btn ${classes.btn_video}`}
        >
          More <ArrowForward />
        </Link>
      </div>
    </div>
  );
}

export default Video;
