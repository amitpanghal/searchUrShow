import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import ManageMovies from "./components/movies/ManageMovies";
import FavMovies from "./components/movies/favMovies/FavMovies";
import WatchLaterList from "./components/movies/watchLater/WatchLaterList";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact component={ManageMovies} />
      <Route path="/fav" exact component={FavMovies} />
      <Route path="/list" exact component={WatchLaterList} />
    </Switch>
  </>
);
export default App;
