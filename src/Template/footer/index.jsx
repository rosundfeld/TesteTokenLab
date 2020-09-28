import React from 'react';

//images

//Material Ui
import { Paper } from '@material-ui/core';

//Material Ui Icons

//Css
import './styles.css';


function Footer() {
    return (
        <div id="footer">
            <Paper className={"footerContainer"} elevation={2}>
                <span> Desenvolvido Por: <strong className="developerName"> Rodrigo Sundfeld </strong></span>
            </Paper>
        </div>
    )
}

export default Footer;