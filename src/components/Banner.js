import classes from "@/styles/banner.module.css";

function Banner() {
  return (
    <div className={classes.banner}>
      <h2 className={classes.banner_title}>Web Development</h2>
      <p className={classes.banner_subtitle}>Chandpur, Matlab South</p>
      <span className={classes.banner_category}>Her Power Project</span>
    </div>
  );
}

export default Banner;
