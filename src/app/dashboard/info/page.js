"use client";
import classes from "@/styles/info.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { ref, get } from "firebase/database";
import Spinner from "@/components/Spinner";
import { LaunchOutlined } from "@mui/icons-material";

function Info() {
  const [regData, setRegData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchStudentData() {
      const regDataRef = ref(db, `registration`);

      try {
        setLoading(true);
        const snapshot = await get(regDataRef);
        if (snapshot.exists()) {
          const dataWithIds = Object.entries(snapshot.val()).map(
            ([id, value]) => ({ dataId: id, ...value })
          );
          setRegData(dataWithIds);
          setLoading(false);
        } else {
          console.log("No data available");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    }

    fetchStudentData();
  }, []);

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
    <div className="container">
      <div>
        <h2 className={classes.info__title}>Registered students</h2>
        <div className={classes.info__container}>
          {loading && <Spinner />}
          {regData &&
            regData.map((val, ind) => (
              <div key={ind} className={classes.infp__card}>
                <h3>
                  {val.firstName} {val.lastName}
                </h3>
                <p className={classes.info__secure}>
                  <span>Email : {maskEmail(val.email)}</span>
                  <span>UserID : {maskEmail(val.userName)}</span>
                </p>
                <div className={classes.link__wrapper}>
                  {makeLinkNameArr(val).map((links, ind) => (
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
                <div className={classes.feed__back}>
                  <p>
                    Status :{" "}
                    {val.isReviewed ? (
                      <span className={classes.sts_success}>Success</span>
                    ) : (
                      <span>Under Review</span>
                    )}
                  </p>
                  <p>
                    Eligible :{" "}
                    {val.isEligible ? (
                      <span className={classes.sts_success}>Eligible</span>
                    ) : (
                      <span>Under Review</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Info;
