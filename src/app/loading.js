import classes from "@/styles/loading.module.css";

function loading() {
  return (
    <div className={classes.loader_wrapper}>
      <div className={classes.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default loading;
