// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import { getSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState("")

  function handleSearchSubmit(){
    if(search.length === 0) return

    
  }

  return (
    <>
      <div id="navPanel">
        <NavLink className='NavLink' exact to="/"><img id='logo' src='/heir-cnc-logo.png'></img></NavLink>
        <ul id="navUl">
          {isLoaded && (
            <>
            <div className='searchbar'>
            <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            >
            </input>
            <button>S</button>
            </div>
              <div id='button-createspot'>
                {sessionUser && <NavLink id='createANewSpotNav' exact to={`/spots/new`}>Create A New Spot</NavLink>}
              </div>
                <div className='upperBarDiv'>
                  <div className='userButtonLi'>
                    <div id='profileUserButton'>

                    <ProfileButton className='userButton' user={sessionUser}  />
                    </div>
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
