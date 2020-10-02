import React, { useState } from 'react';
  

//Material Ui
import { Button, Paper, TextField } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function Calendar({toggleNewEvent}) {

    //title and description variables
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    //Date variable
    const [datetimeBegin, setDatetimeBegin] = useState("");
    const [datetimeEnd, setDatetimeEnd] = useState("");


    //handle function to get date data
    function handleChangeBegin(ev) {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'];
        setDatetimeBegin(dt);
      }
    function handleChangeEnd(ev) {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'];
        setDatetimeEnd(dt);
      }

    //Save new event
    function saveEvent(){
        toggleNewEvent();
    }

      return (
        <div id="calendar">  
            <Paper className="actionsContainer" elevation={2}>
                <form className="formAddEvent" noValidate autoComplete="off">
                    <TextField
                        id="eventTitle"
                        label="Título"
                        type="text"
                        className="calendarField"
                        onChange={ e => setEventTitle(e.target.value) }
                        value={ eventTitle }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    <TextField
                        id="eventDescription"
                        label="Descrição"
                        type="text"
                        className="calendarFieldDescription"
                        onChange={ e => setEventDescription(e.target.value) }
                        value={ eventDescription }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="dateIni"
                        label="Começo do Evento"
                        type="datetime-local"
                        defaultValue="2020-05-24T11:30"
                        className="calendarField"
                        onChange={ handleChangeBegin }
                        value={(datetimeBegin || '').toString().substring(0, 16)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="dateEnd"
                        label="Fim do Evento"
                        type="datetime-local"
                        defaultValue="2020-05-24T10:30"
                        className="calendarField"
                        onChange={ handleChangeEnd }
                        value={(datetimeEnd || '').toString().substring(0, 16)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="buttonContainer">
                        <Button onClick={() => saveEvent()} className="addButton" id="addButton" >
                            Salvar
                        </Button>
                        <Button onClick={() => toggleNewEvent()} className="cancelAction" id="cancel" >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default Calendar;