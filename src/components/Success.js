import classes from "@/styles/regSuccess.module.css";
import Link from "next/link";

function Success() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.success__msg}>
        <h3>Congratulations!</h3>
        <p>Your information has been successfully submitted.</p>
        <Link href="/" className={classes.success__btn}>
          Got it!
        </Link>
      </div>
    </div>
  );
}

export default Success;
