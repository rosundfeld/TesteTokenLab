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
import { Home, Person  } from '@material-ui/icons';

//Css
import './styles.css';

//views
import HomeComponent from '../../views/home';
import ProfileComponent from '../../views/profile';

function Nav() {
    return (
        <div id="nav">
            <Router>
                <div id="navigation">
                    <div className="navContainer" >
                        <List>
                            <Link to="/">
                                <ListItem button>
                                        <ListItemIcon className="navIcon">
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText className="navText" primary="Início" />
                                </ListItem>
                            </Link>
                            <Link to="/perfil">
                                <ListItem button>
                                        <ListItemIcon className="navIcon">
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText className="navText" primary="Perfil" />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
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
            </Router>
        </div>
    )
}

export default Nav;