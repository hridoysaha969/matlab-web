import classes from "@/styles/updatestudent.module.css";
import { Close } from "@mui/icons-material";
function SuccessPopUp({ message, success, setSuccess }) {
  return (
    <div
      className={`${classes.popup__message} ${success ? classes.active : null}`}
    >
      <span>{message}</span>{" "}
      <span onClick={() => setSuccess(false)}>
        <Close />
      </span>
    </div>
  );
}

export default SuccessPopUp;
