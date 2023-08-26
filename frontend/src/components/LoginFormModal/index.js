import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    const credential = 'JackDoe'
    const password = 'password3'
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
  }

  return (
    <>
    <div id="loginLoginErrors">
      <h1 className="LoginH1">Log In</h1>
      {errors.credential && (<p className="errors">{errors.credential}</p>)}
    </div>
      <form onSubmit={handleSubmit}>
        <div id="loginContent">
          <div id="usernameOrPassword">
            <div className="userNameOrEmail">
              <label>
                <input
                  className="userInput"
                  id="loginUsername"
                  type="text"
                  value={credential}
                  placeholder="Username or Email"
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="password">
              <label>

                <input
                  className="userInput"
                  id="loginPassword"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="submitDemoUserButtons">
            <button disabled={credential.length < 4 || password.length < 6 ? true : false} className="loginButton">Log In</button>
            <button className="DemoUserButton" onClick={demoUser}>Demo User</button>
          </div>
        </div>
      </form>

    </>
  );
}

export default LoginFormModal;
