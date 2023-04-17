import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
     setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  return (
    <>
      <div id="signContainer">
        <h1 id="signupTitle">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div id="signupEmail">
            <label class="SignupLabel">
              Email
              <input
              className="userInput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label class="SignupLabel">
            Username
            <input
              className="userInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          <label class="SignupLabel">
            First Name
            <input
              className="userInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <label class="SignupLabel">
            Last Name
            <input
              className="userInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <label class="SignupLabel">
            Password
            <input
              className="userInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          <label class="SignupLabel">
            Confirm Password
            <input
              className="userInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p id="signupErrors" className="errors">{errors.confirmPassword}</p>
          )}
          <div id="signupButtonDiv">
            <button id="signupButton" disabled={password.length < 6 || confirmPassword.length === 0 || lastName.length === 0 || firstName.length === 0 || email.length === 0 || username.length < 4 ? true : false} type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
