import React from 'react';

//Material Ui
import { Paper } from '@material-ui/core';

//Material Ui Icons
import { Home  } from '@material-ui/icons';

//Css
import './styles.css';

function Header() {
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
            </Paper>
        </div>
    )
}

export default Header;