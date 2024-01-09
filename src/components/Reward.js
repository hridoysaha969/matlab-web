import classes from "@/styles/reward.module.css";
import Video from "./Video";

const videosArr = [
  {
    videoId: "Vn-J2kWLz0w",
    title: "Animated Responsive Website 1",
  },
  {
    videoId: "InayXvUqKl4",
    title: "Animated Responsive Website 2",
  },
];

function Reward() {
  return (
    <div className={classes.reward}>
      <h2 className={classes.reward__title}>Rewards</h2>

      <div className={classes.video__container}>
        {videosArr.map((data, ind) => (
          <Video key={ind} videoData={data} />
        ))}
      </div>
    </div>
  );
}

export default Reward;
