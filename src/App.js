import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

import Movies from './Components/Movies';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Catagories from "./Components/Catagories";
import OneMovie from "./Components/OneMovie";

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
                  <Link to='movies'>Movie</Link>
                </li>

                <li className="list-group-item">
                  <Link to='by-catagory'>Catagories</Link>
                </li>

                <li className="list-group-item">
                  <Link to='admin'>Manage Catalogue</Link>
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

              <Route exact path="/by-catagory">
                <CategoryPage />
              </Route>

              <Route exact path="/by-catagory/drama"
                render= {(props) => <Catagories {... props} title = {`Drama`}/> } 
              />

              <Route exact path="/by-catagory/comedy"
                render= {(props) => <Catagories {... props} title = {`Comedy`}/> } 
              />

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


  function CategoryPage() {
    let { path , url } = useRouteMatch() ;
    
    return (
      <div>
        <h2>Catagories</h2>
        <ul>
          <li> <Link to={`${path}/drama`}>Drama</Link> </li>
          <li> <Link to={`${path}/comedy`}>Comedy</Link> </li>
        </ul>
      </div>
    );
  }
  
}
