import classes from "@/styles/updatestudent.module.css";

function UpdateBtn({ studentData }) {
  return (
    <button className={classes.update__btn} type="submit">
      Update
    </button>
  );
}

export default UpdateBtn;
