"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import classes from "@/styles/admin.module.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInfo.email) {
      setError("Insert your email");
    } else if (!loginInfo.password) {
      setError("Insert your password");
    } else {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(
          auth,
          loginInfo.email,
          loginInfo.password
        );

        e.target.reset();
        setLoginInfo({
          email: "",
          password: "",
        });
        Cookies.set("7uDFVrhs6", true);
        push("/dashboard");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className={classes.login__container}>
      <h1 className={classes.admin__title}>Admin Login</h1>
      <form className={classes.login__form} onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
        </label>
        {error ? (
          <div className={classes.invalid__feedback}>{error}</div>
        ) : null}
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
