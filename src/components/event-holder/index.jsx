import React, { useState } from 'react';
  

//Material Ui
import { Tooltip, Paper, Typography, Chip, IconButton  } from '@material-ui/core';

//Material Ui Icons
import { AlarmOn, AlarmOff, Delete, Create } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function EventHolder() {

    //title and description variables
    // const [eventTitle, setEventTitle] = useState("");
    // const [eventDescription, setEventDescription] = useState("");

    //Date variable
    // const [datetimeBegin, setDatetimeBegin] = useState("");
    // const [datetimeEnd, setDatetimeEnd] = useState("");



      return (
        <div id="eventHolder">  
            <Paper className="eventContainer" elevation={2}>
                <div className="infoContainer">
                    <div className="titleAndDescriptionContainer">
                        <Typography className="eventInfo" id="titleCard">
                            Jantar na Churrascaria top
                        </Typography>
                        <Typography className="eventInfo" id="description">
                            Comer uma picanha da boa HUMMMMMMMMMM
                        </Typography>
                    </div>
                    <div className="timeStampContainer">
                        <Typography id="eventBegin" className="eventDate">
                            <Chip icon={<AlarmOn />} color="primary" label="Começa às: 21/03/2020 10:30" variant="outlined" />
                        </Typography>
                        <Typography id="eventEnd" className="eventDate">
                            <Chip icon={<AlarmOff />} color="secondary" label="Termina às: 21/03/2020 10:30" variant="outlined" />
                        </Typography>
                    </div>
                </div>
                <div className="actionContainer">
                   <div className="eventButtons">
                        <Tooltip className="buttonTooltip" title="Editar">
                            <IconButton className="iconButton" color="primary" aria-label="Editar">
                                <Create id="edit"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip className="buttonTooltip" title="Deletar">
                            <IconButton className="iconButton" color="secundary" aria-label="Deletar">
                                <Delete id="delete" />
                            </IconButton>
                        </Tooltip>
                   </div>
                </div>
            </Paper>
        </div>
    )
}

export default EventHolder;