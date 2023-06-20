import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/home";
import CreateSpot from "./components/createSpot/"
import GetSpotById from "./components/getSpotById/";
import UpdateSpot from "./components/updateASpot";
import ManageSpot from "./components/manageSpot";
import UserBookings from "./components/userBookings";
import UserReviews from "./components/userReviews";





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
          <Route exact path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>

          <Route exact path='/spots/current'>
            <ManageSpot />
          </Route>

          <Route exact path='/spots/new'>
            <CreateSpot />
          </Route>

          <Route exact path='/spots/:spotId'>
            <GetSpotById />
          </Route>

          <Route path='/bookings/current'>
            <UserBookings />
          </Route>

          <Route path='/reviews/current'>
            <UserReviews />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>





        </Switch>
      }
    </>
  );
}

export default App;
