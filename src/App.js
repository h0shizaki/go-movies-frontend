import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

import Movies from './Components/Movies';
import Home from './Components/Home';
import Admin from './Components/Admin';
import OneMovie from "./Components/OneMovie";
import Genres from './Components/Genres'
import OneGenre from "./Components/OneGenre";
import EditMovie from "./Components/EditMovie";

export default function app() {

  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-5">
            Go watch movies!
          </h1>
          <hr className="mb-3" />
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to='/'>Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to='/movies'>Movie</Link>
                </li>

                <li className="list-group-item">
                  <Link to='/genres'>Genres</Link>
                </li>

                <li className="list-group-item">
                  <Link to='/admin/movie/0'>Add Movie</Link>
                </li>

                <li className="list-group-item">
                  <Link to='/admin'>Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">


            <Switch>
              <Route path="/movies/:id" component= {OneMovie} />

              <Route path="/movies"> 
                <Movies /> 
              </Route>

              <Route path="/genre/:id" component= {OneGenre} />

              <Route exact path="/genres">
                <Genres />
              </Route>

              <Route path="/admin/movie/:id" component={EditMovie} />

              <Route path="/admin"> 
                <Admin /> 
              </Route>

              <Route path="/"> 
                <Home /> 
              </Route>
            </Switch>
          </div>

        </div>

      </div>
    </Router>
  );
  
}
