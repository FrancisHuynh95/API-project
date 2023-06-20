import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);

  };

  useEffect(() => {
    if (!showMenu) return;


    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);

      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="topuserbuttonandbar">
        <button id="navButton" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
          </div>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className="userInfoLi">Hello, {user.username}</li>
              <li id="helloUser" className="userInfoLi">{user.email}</li>
              <li id="helloUserSpots" className="userInfoLi"><Link id="helloButton" onClick={closeMenu} to="/spots/current">Manage Spots</Link></li>
              <li id="manageBookings"><Link onClick={closeMenu} to="/reviews/current">Manage Reviews</Link></li>
              <li id="manageBookings"><Link onClick={closeMenu} to="/bookings/current">Manage Bookings</Link></li>
              <li>
                <div id="logoutButtonDiv">
                <button id="logoutButton" onClick={logout}>Log Out</button>
                </div>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
    </>
  );
}

export default ProfileButton;
