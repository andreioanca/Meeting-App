import React, { useState } from "react";
import LoginButton from "../../components/button/login-button";
import { Navigate } from "react-router-dom";
import "./login.scss";
import successNotification from "../../components/notification/toast-notification";

const LogIn = () => {
  const currentPath = window.location.pathname;

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let item = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    console.warn(item);

    let result = await fetch(" http://localhost:8000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: item,
    });
    result = await result.json();
    setSuccess(true);
    if (password === confirmPassword) {
      successNotification("Account Created Successfully!");
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(false);

  if (success === true) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="login-page">
      <div className="left-panel">
        <div className="login-section">
          <span id="login-text">SIGN UP</span>
          <form onSubmit={signUp}>
            {currentPath.includes("register") ? (
              <label>
                Name
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter name"
                />
              </label>
            ) : null}

            <label>
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <br />
              <input
                type={passwordShown ? "text" : "password"}
                required
                id="password"
                placeholder="Min 8 characters, one capital letter, one number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <a className="show-password" onClick={togglePassword}></a>
            </label>

            <br />
            <label>
              Confirm Password
              <br />
              {}
              <input
                type={passwordShown ? "text" : "password"}
                required
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Min 8 characters, one capital letter, one number"
              ></input>
              <a className="show-confirm-password" onClick={togglePassword}></a>
            </label>

            <br />
            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  value="Remember me"
                  required
                />
                I Accept <span>Terms And Conditions</span>
              </label>
            </div>
            <br />

            <LoginButton className="login-button" />
          </form>
          <p>
            Already a member? Sign In <a href="./login">Here.</a>
          </p>
        </div>
      </div>

      <div className="right-panel">
        Welcome!
        <br />
        Let's sign in
        <br />
        to your
        <br />
        account.
      </div>
    </div>
  );
};

export default LogIn;
