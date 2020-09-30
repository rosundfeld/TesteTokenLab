import React, { useState } from 'react';

//importing router
import {
    Redirect
  } from "react-router-dom";

//Material Ui
import { Paper, Menu, MenuItem } from '@material-ui/core';

//Material Ui Icons
import { Home, ArrowDropDown  } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function Header( props ) {

    //userMenu toggle variable
    const [anchorEl, setAnchorEl] = useState(null);
    
    //userMenu open Function
    function handleClick(e) {
        setAnchorEl(e.target);
    };

    //userMenu close Function
    function handleClose() {
        setAnchorEl(null);
    };

    //logout function
    async function logout() {
        await firebase.logout();
        window.location.reload(false);
      }

      
      
      if( !firebase.getCurrentUsername) {
          return(
            <Redirect to='/login'/>
          )
      }
      return (
        <div id="header">
            <Paper className="headerContainer" elevation={2}>
                <span>
                    <img src={require('../../assets/images/TokenLab_Logo.png')} id="logo" alt="Logo" />
                </span>
                <span className="title-group">
                         <Home id="icon"/> 
                        <span id="text" >Início</span>
                </span>
                <div className="userSettings">
                    <span onClick={(e) => handleClick(e)} className="userName">
                        {firebase.getCurrentUsername()}<ArrowDropDown />
                    </span>
                    <Menu
                    id="userMenu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClose()}>Profile</MenuItem>
                        <MenuItem onClick={() =>  logout()}>Logout</MenuItem>
                    </Menu>
                </div>
            </Paper>
        </div>
    )
}

export default Header;