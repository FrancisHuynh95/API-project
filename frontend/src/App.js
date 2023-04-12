import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/home";
import CreateSpot from "./components/createSpot/"
import GetSpotById from "./components/getSpotById/";
import UpdateSpot from "./components/updateASpot";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/spots/new'>
            <CreateSpot />
          </Route>

          <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          
          <Route path='/spots/:spotId'>
            <GetSpotById />
          </Route>


        </Switch>
      }
    </>
  );
}

export default App;
