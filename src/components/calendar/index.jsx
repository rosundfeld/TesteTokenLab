import React, { useState } from 'react';
  

//Material Ui
import { Button, CircularProgress, Paper, TextField, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

//Material Ui Icons
import { TrainOutlined } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function Calendar({ toggleNewEvent, getDataFromFirebase }) {

    //title and description variables
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    //Date variable
    const [datetimeBegin, setDatetimeBegin] = useState("");
    const [datetimeEnd, setDatetimeEnd] = useState("");
    
    // add Loader variable, to wait until the event is create
    const [loader, setLoader] = useState(true);

    //open modal to confirm add event in the same day
    const [confirmEvent, setConfirmEvent] = useState(false);

    //handleFunction To open confirm event
    function toggleConfirmEvent() {
        setConfirmEvent(confirmEvent => ! confirmEvent);
    }

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

    //check if have some event in the same day
    async function checkOtherEvent(){
        let beginDate = Math.round(new Date(datetimeBegin).getTime()/1000);
        let endDate = Math.round(new Date(datetimeEnd).getTime()/1000);
        let allEvents = await firebase.getEventData();

        let check = false;
        allEvents.forEach(event => {
            if( (beginDate > event.endDateTimestamp) || (beginDate < event.beginDateTimestamp && endDate < event.beginDateTimestamp) ){
                check = true
            }
        })
        return check;
    }

    //check if the dates format is valid
    function checkDate(){
        //get timeStamp from dates
       let beginDate = Math.round(new Date(datetimeBegin).getTime()/1000);
       let endDate = Math.round(new Date(datetimeEnd).getTime()/1000);

        if(beginDate < endDate && eventTitle !== "" && eventDescription !== "" && beginDate !== "" && endDate !== ""){
            return true
        }else{
            return false
        }
    }

    //Save new event
    async function saveEvent(confirm){
        if( checkDate() ){
            if( await checkOtherEvent() || confirm){
                setLoader(false);
                await firebase.saveEvent(eventTitle, eventDescription, datetimeBegin, datetimeEnd);
                getDataFromFirebase();
                toggleNewEvent();
            }else{
                setConfirmEvent(true);
            }
        } else {
            alert("Data de começo é maior que a data final, ou há campos vazios!");
        }
    }

    //formatted date for inputProps
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const minDate = yesterday.toISOString().split(":");

      return (
        <div id="calendar">  
            <Paper className="actionsContainer" elevation={2}>
                <form className="formAddEvent" noValidate autoComplete="off">
                    <TextField
                        id="eventTitle"
                        label="Título"
                        required
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
                        required
                        label="Começo do Evento"
                        type="datetime-local"
                        inputProps={
                            {
                                min: minDate[0]+":"+minDate[1]
                            }
                        }
                        className="calendarField"
                        onChange={ handleChangeBegin }
                        value={(datetimeBegin || '').toString().substring(0, 16)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="dateEnd"
                        required
                        label="Fim do Evento"
                        type="datetime-local"
                        inputProps={
                            {
                                min: minDate[0]+":"+minDate[1]
                            }
                        }
                        className="calendarField"
                        onChange={ handleChangeEnd }
                        value={(datetimeEnd || '').toString().substring(0, 16)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div className="buttonContainer">
                        {loader ? 
                            <Button onClick={() => saveEvent(false)} className="addButton" id="addButton" >
                                Salvar
                            </Button> 
                            :
                            <CircularProgress />
                        }
                        <Button onClick={() => toggleNewEvent()} className="cancelAction" id="cancel" >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Paper>
            <Dialog
                open={confirmEvent}
                onClose={() => toggleConfirmEvent()}
                aria-labelledby="Confirmar Adição"
                >
                    <DialogTitle><span className="confirmTitle" >Há um evento marcado no mesmo dia e horário, deseja mesmo criar um novo evento?"</span></DialogTitle>
                    <DialogActions className="confirmButtonsContainer">
                        <Button onClick={() => toggleConfirmEvent()} className="cancelButton">
                            Cancelar
                        </Button>
                        <Button onClick={() => saveEvent(true)} className="defaultButton" autoFocus>
                            Criar
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default Calendar;