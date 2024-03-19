import styles from "@/styles/status.module.css";
import successImg from "../../public/success.svg";
import Image from "next/image";
import Link from "next/link";
import { LaunchOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function UserData({ data }) {
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
    <div className={styles.container}>
      <div className={styles.success__img}>
        <Image src={successImg} alt="Description of the image" width={100} />
        <h3>
          Congratulations! {data.firstName} {data.lastName}
        </h3>
      </div>
      <div className={styles.data__row}>
        <div className={styles.data__label}>Email:</div>
        <div className={`${styles.data__value} ${styles.data__value_flex}`}>
          {showMail ? data.email : maskEmail(data.email)}{" "}
          <span
            className={styles.visibility_icon}
            onClick={() => setShowMail(!showMail)}
          >
            {showMail ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
      </div>
      <div className={styles.data__row}>
        <div className={styles.data__label}>Username:</div>
        <div className={`${styles.data__value} ${styles.data__value_flex}`}>
          {showUserName ? data.userName : maskEmail(data.userName)}{" "}
          <span
            className={styles.visibility_icon}
            onClick={() => setShowUserName(!showUserName)}
          >
            {showUserName ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
      </div>

      <p className={styles.project__title}>Your Projects</p>
      <div className={styles.link__wrapper}>
        {makeLinkNameArr(data).map((links, ind) => (
          <Link
            key={ind}
            href={links.link}
            target="_blank"
            className={styles.link__name}
          >
            {ind + 1}. {links.name} <LaunchOutlined />
          </Link>
        ))}
      </div>

      <div
        className={`${styles.data__row} ${styles.data__value} ${styles["eligibili__eligible"]}`}
      >
        <div className={styles.status_info}>
          <div className={styles.data__label}>Eligibility:</div>
          <div
            className={
              data.isEligible ? styles.status__success : styles.status__review
            }
          >
            {data.isEligible ? "Eligible" : "Under review"}
          </div>

          <div className={styles.data__label}>Status:</div>
          <div
            className={
              data.isReviewed ? styles.status__success : styles.status__review
            }
          >
            {data.isReviewed ? "Succcess" : "Under review"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
