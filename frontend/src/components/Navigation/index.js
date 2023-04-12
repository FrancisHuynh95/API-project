// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let demoUser;

  return (
    <>
          <NavLink className='NavLink' exact to="/">Home</NavLink>
      <ul>
        {isLoaded && (
          <>
          <div className='upperBarDiv'>
          {sessionUser && <NavLink exact to={`/spots/new`}>Create A Spot</NavLink> }
            <li className='userButtonLi'>
              <ProfileButton className='userButton' user={sessionUser} />
            </li>
          </div>
          </>
        )}
      </ul>
    </>
  );
}

export default Navigation;
