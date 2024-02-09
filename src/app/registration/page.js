"use client";
import classes from "@/styles/registration.module.css";
import { useState } from "react";
import { db } from "@/config/firebase";
import { ref, set } from "firebase/database";

function page() {
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    projectName: "",
    projectLink: "",
    linkArr: [],
    isEligible: false,
    isReviewed: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addLink = () => {
    console.log(regData.projectLink);
    if (regData.projectLink.indexOf("https://") !== -1) {
      regData.linkArr.push(regData.projectLink);
      setRegData({
        ...regData,
        projectLink: "",
      });
    } else {
      setError("Enter a valid URL that contains https://");
    }
  };

  const handleChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, email, projectName, linkArr } =
      regData;

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !projectName ||
      linkArr.length < 5 ||
      error
    ) {
      setError("Please fill all the information");
    } else {
      const userRegx = /^[A-Za-z][A-Za-z0-9_]{6,15}$/;
      if (userRegx.test(regData.userName)) {
        try {
          setLoading(true);
          const dataRef = ref(db, `registration/${regData.userName}`);
          await set(dataRef, regData);
          e.target.reset();
          setRegData({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            projectName: "",
            projectLink: "",
            linkArr: [],
            isEligible: false,
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      } else {
        setError("Username must contain letters and number");
      }
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className={classes.title}>Registration Form</h2>

        <form className={classes.reg__form} onSubmit={handleSubmit}>
          <div className={classes.input_wrap}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={regData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={regData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="userName"
              placeholder="@username"
              value={regData.userName}
              onChange={handleChange}
            />
          </div>
          <div className={classes.input_wrap}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={regData.email}
              onChange={handleChange}
            />
          </div>
          <div className={classes.input_wrap}>
            <input
              type="text"
              name="projectName"
              placeholder="Enter Project Name"
              value={regData.projectName}
              onChange={handleChange}
            />
            <label>
              <input
                type="text"
                name="projectLink"
                placeholder="Enter Project Link"
                value={regData.projectLink}
                onChange={handleChange}
              />
              <button
                type="button"
                className={classes.add_btn}
                disabled={regData.projectLink.length < 3}
                onClick={addLink}
              >
                +
              </button>
              Add at least 5 project link
              {regData.linkArr.length !== 0 &&
                regData.linkArr.map((val, ind) => (
                  <p key={ind} className={classes.link_list}>
                    {ind + 1}. {val}
                  </p>
                ))}
            </label>
          </div>
          <button
            type="submit"
            className={classes.btn_submit}
            disabled={loading}
          >
            Submit
          </button>

          {error && <div className={classes.invalid__feedback}>{error}</div>}
        </form>

        <p className={classes.note__token}>
          <span className={classes.note__label}>NOTE :</span> Your data will be
          reviewed for 7 working days after registration. Only registered
          students will get the <span>premium package</span> of web development
          course and a proper <span>roadmap/guideline</span>.
        </p>
      </div>
    </section>
  );
}

export default page;
