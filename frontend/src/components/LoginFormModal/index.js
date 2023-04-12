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
    const credential = 'FakeUser2'
    const password = 'password3'
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
  }

  return (
    <>
        <h1 className="LoginH1">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="userNameOrEmail">
            <label>

              <input
                className="loginModal"
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
                className="loginModal"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {errors.credential && (
            <p>{errors.credential}</p>
          )}
          <div className="submitDemoUserButtons">
            <button className="loginButton" type="submit">Log In</button>
            <button className="DemoUserButton" onClick={demoUser}>Demo User</button>
          </div>
        </form>

    </>
  );
}

export default LoginFormModal;
