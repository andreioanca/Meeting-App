import { useRef, useState, useContext } from "react";
import AuthContext from "./auth-provides";
import axios from "./axios-instance";
import LoginButton from "../../../components/button/login-button";
import "./login-component.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const LOGIN_URL = "/auth/login";
  const navigate = useNavigate();

  const errRef = useRef("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: userEmail, password: userPassword }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
          withCredentials: false,
        }
      );

      const { access_token, roles, email, name, id } = response?.data;

      localStorage.setItem("access_token", JSON.stringify(access_token));
      localStorage.setItem("user", JSON.stringify({ email, name, id, roles }));

      navigate("/dashboard");

      setAuth({
        id,
        username: name,
        email,
        roles,
        access_token: access_token,
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username of Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div id="login-page">
        <div className="users-section">
          {/* <div className="standard-or-admin">
            <button>STANDARD USER</button>
            <button>ADMINISTRATOR</button>
          </div> */}
          <div className="left-panel">
            <div className="login-section">
              <p
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <span id="login-text">LOG IN</span>
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                ></input>

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                ></input>

                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" name="remember" />
                    Remember Me
                  </label>
                  <span>
                    <a href="/">Forgot Password?</a>
                  </span>
                </div>
                <LoginButton className="login-button" />
              </form>
              <p>
                Already a member? Sign In <a href="./register">Here.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="right-panel">
          Welcome!
          <br />
          Let’s sign in
          <br /> to your
          <br /> account.
        </div>
      </div>
    </>
  );
};
export default Login;
