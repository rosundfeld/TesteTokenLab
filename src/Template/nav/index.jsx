import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

//images

//Css
import './styles.css';

//views
import HomeComponent from '../../views/home';
import ProfileComponent from '../../views/profile';

function Nav() {
    return (
        <Router>
            <div id="nav">
                    <div id="navigation">
                        <div className="routerContainer">
                            <div className="content">
                                <Switch>
                                    <Route exact path="/">
                                        <HomeComponent />
                                    </Route>
                                    <Route path="/perfil">
                                        <ProfileComponent />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
            </div>
        </Router>
    )
}

export default Nav;