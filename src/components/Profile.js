import classes from "@/styles/status.module.css";
import Link from "next/link";
import { KeyboardArrowLeft, Person, Timeline } from "@mui/icons-material";
import ProfileContent from "./ProfileContent";
import { useState } from "react";

function Profile({ data }) {
  const [tabAbout, setTabAbout] = useState(true);
  return (
    <div>
      <div className={classes.profile__tab}>
        <Link href="/result">
          <KeyboardArrowLeft />
        </Link>
        <h3>My Profile</h3>
        <span>{/* <Menu /> */}</span>
      </div>
      <div className={classes.profile__header}>
        <div className={classes.profile__display}>
          {data.firstName.charAt(0)}
          {data.lastName.charAt(0)}
        </div>
        <h4>
          {data.firstName} {data.lastName}
        </h4>
      </div>
      <div className={classes.profile__content}>
        <div className={classes.profile__nav}>
          <h4
            className={`${tabAbout && classes.active}`}
            onClick={() => setTabAbout(true)}
          >
            <Person /> About
          </h4>
          <h4
            className={`${!tabAbout && classes.active}`}
            onClick={() => setTabAbout(false)}
          >
            <Timeline /> Workspace
          </h4>
        </div>
        <ProfileContent tabAbout={tabAbout} data={data} />
      </div>
    </div>
  );
}

export default Profile;
