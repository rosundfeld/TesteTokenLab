import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//images


//Material Ui
//Paper
import { List } from '@material-ui/core'
//List
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

//Material Ui Icons
import { Home } from '@material-ui/icons';

//Css
import './styles.css';

//views
import HomeComponent from '../../views/home';
import ProfileComponent from '../../views/profile';

//More than one class
import classnames from 'classnames';

function Nav() {
    return (
        <Router>
            <div id="nav">
                    <div id="navigation">
                        {/* <div className={classnames("navContainer", "navMobile")} >
                            <span>
                                <img src={require('../../assets/images/TokenLab_Logo.png')} id="logo" alt="Logo" />
                            </span>
                            <List>
                                <Link to="/">
                                    <ListItem button>
                                            <ListItemIcon className="navIcon">
                                                <Home />
                                            </ListItemIcon>
                                            <ListItemText className="navText" primary="Início" />
                                    </ListItem>
                                </Link>
                            </List>
                        </div> */}
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