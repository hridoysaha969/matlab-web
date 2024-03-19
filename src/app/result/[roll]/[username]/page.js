"use client";
import classes from "@/styles/status.module.css";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import UserData from "@/components/UserData";
import Spinner from "@/components/Spinner";
import Link from "next/link";

function Username({ params }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db, `registration/${params.username}`);

      try {
        setLoading(true);
        const snapshot = await get(dataRef);
        // console.log(snapshot.val());

        if (snapshot.val()) {
          // console.log("Success");
          setData(snapshot.val());
        } else {
          // console.log("Incorrect User Name");
        }

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : data ? (
        <UserData data={data} />
      ) : (
        <div className={classes.incorrect__wrapper}>
          <p>
            Incorrect Username or Email <Link href="/result">Go Back</Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default Username;
