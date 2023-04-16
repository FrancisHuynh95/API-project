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
      <div id="navPanel">
        <NavLink className='NavLink' exact to="/"><img id='logo' src='/heir-cnc-logo.png'></img></NavLink>
        <ul id="navUl">
          {isLoaded && (
            <>
              <div id='button-createspot'>
                {sessionUser && <NavLink exact to={`/spots/new`}>Create A New Spot</NavLink>}
                <div className='upperBarDiv'>
                  <li className='userButtonLi'>
                    <i class="fa-solid fa-bars"></i>
                    <ProfileButton className='userButton' user={sessionUser} />
                  </li>
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navigation;
