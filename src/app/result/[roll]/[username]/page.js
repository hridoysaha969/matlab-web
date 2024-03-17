import classes from "@/styles/status.module.css";

function Username({ params }) {
  return (
    <div className="container">
      <div className={classes.error}>
        <h3>Currently Unavailable</h3>
        <p>Will be available soon!</p>
      </div>
    </div>
  );
}

export default Username;
