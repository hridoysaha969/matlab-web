import classes from "@/styles/status.module.css";
import Link from "next/link";
import { LaunchOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function ProfileContent({ tabAbout, data }) {
  const [showMail, setShowMail] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const makeLinkNameArr = (dataObj) => {
    const arrayOfObjects = [];

    for (
      let i = 0;
      i < Math.min(dataObj.linkArr.length, dataObj.siteNameArr.length);
      i++
    ) {
      // Create an object with properties from both arrays
      const obj = {
        link: dataObj.linkArr[i],
        name: dataObj.siteNameArr[i],
      };
      // Push the object into the array
      arrayOfObjects.push(obj);
    }

    return arrayOfObjects;
  };

  const maskEmail = (email) => {
    // Use regular expression to match username part
    let maskedEmail = email.replace(/(?<=.{4})./g, "*"); // Replace characters after the first 5 characters with asterisks
    return maskedEmail;
  };

  return (
    <div className={classes.content__wrapper}>
      {tabAbout ? (
        <div className={classes.content__info}>
          <div className={classes.content__label}>
            <label>Email : </label>
            <label className={classes.data__value_flex}>
              {showMail ? data.email : maskEmail(data.email)}{" "}
              <span
                className={classes.visibility_icon}
                onClick={() => setShowMail(!showMail)}
              >
                {showMail ? <VisibilityOff /> : <Visibility />}
              </span>
            </label>
          </div>
          <div className={classes.content__label}>
            <label>Username : </label>
            <label className={classes.data__value_flex}>
              {showUserName ? data.userName : maskEmail(data.userName)}{" "}
              <span
                className={classes.visibility_icon}
                onClick={() => setShowUserName(!showUserName)}
              >
                {showUserName ? <VisibilityOff /> : <Visibility />}
              </span>
            </label>
          </div>
          <div className={classes.content__label}>
            <label>Phone : </label>
            <label>N/A</label>
          </div>
          <div className={classes.content__label}>
            <label>Status : </label>
            <label
              className={`${
                data.isReviewed ? classes.success : classes.pending
              }`}
            >
              {data.isReviewed ? "Success" : "Under review"}
            </label>
          </div>
          <div className={classes.content__label}>
            <label>Eligibility : </label>
            <label
              className={`${
                data.isEligible ? classes.success : classes.pending
              }`}
            >
              {data.isEligible ? "Eligible" : "Under review"}
            </label>
          </div>
        </div>
      ) : (
        <div className={classes.content__details}>
          <h4 className={classes.project__title}>Your Projects</h4>
          <div className={classes.link__wrapper}>
            {makeLinkNameArr(data).map((links, ind) => (
              <Link
                key={ind}
                href={links.link}
                target="_blank"
                className={classes.link__name}
              >
                {ind + 1}. {links.name} <LaunchOutlined />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileContent;
