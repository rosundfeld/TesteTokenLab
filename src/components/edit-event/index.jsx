import React, { useState } from 'react';
  

//Material Ui
import { Button, CircularProgress, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Css
import './styles.css';

function EditEvent({eventData, handleCloseEdit, open, getDataFromFirebase }) {

    //title and description variables
    const [eventTitleEdit, setEventTitleEdit] = useState(eventData.title);
    const [eventDescriptionEdit, setEventDescriptionEdit] = useState(eventData.description);

    //Date variable
    const [datetimeBeginEdit, setDatetimeBeginEdit] = useState(eventData.beginDate + "T" + eventData.beginTime);
    const [datetimeEndEdit, setDatetimeEndEdit] = useState(eventData.endDate + "T" + eventData.endTime);
    
    // add Loader variable, to wait until the event is create
    const [loader, setLoader] = useState(true);

    const [confirmEvent, setConfirmEvent] = useState(false);

    function toggleConfirmEvent(){
        setConfirmEvent(confirmEvent => ! confirmEvent);
    }

    //handle function to get date data
    function handleChangeBegin(ev) {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'];

        setDatetimeBeginEdit(dt);
      }

    function handleChangeEnd(ev) {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'];
        setDatetimeEndEdit(dt);
      }

       //check if have some event in the same day
    async function checkOtherEvent(){
        let beginDate = Math.round(new Date(datetimeBeginEdit).getTime()/1000);
        let endDate = Math.round(new Date(datetimeEndEdit).getTime()/1000);
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
       let beginDate = Math.round(new Date(datetimeBeginEdit).getTime()/1000);
       let endDate = Math.round(new Date(datetimeEndEdit).getTime()/1000);

        if(beginDate < endDate && eventTitleEdit !== "" && eventDescriptionEdit !== "" && beginDate !== "" && endDate !== ""){
            return true
        }else{
            return false
        }
    }

    //Save new event
    async function editEvent(confirm){
        if( checkDate() ){
            if( await checkOtherEvent() || confirm){
                setLoader(false);
                await firebase.updateItem(eventData.id, eventTitleEdit, eventDescriptionEdit, datetimeBeginEdit, datetimeEndEdit);
                getDataFromFirebase();
                handleCloseEdit();
            }else{
                setConfirmEvent(true);
            }
        } else {
            alert("Data de começo é maior que a data final, ou há campos vazios!");
        }
    }

    //formatted date for inputProps
    const minDate = new Date().toISOString().split(":");

      return (
        <div id="editEvent">  
             <Dialog
                open={open}
                onClose={() => handleCloseEdit()}
                aria-labelledby="Editar Evento"
                >
                    <DialogTitle><span className="editTitle" >Editar Evento</span></DialogTitle>

                    <DialogContent className="editDialog">
                        { loader ?
                            <form className="formEditEvent" noValidate autoComplete="off">
                                <TextField
                                    id="eventTitleEdit"
                                    required
                                    label="Novo Título"
                                    type="text"
                                    className="editField"
                                    onChange={ e => setEventTitleEdit(e.target.value) }
                                    value={ eventTitleEdit }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                <TextField
                                    id="eventDescription"
                                    required
                                    label="Novo Descrição"
                                    type="text"
                                    className="editField"
                                    onChange={ e => setEventDescriptionEdit(e.target.value) }
                                    value={ eventDescriptionEdit }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="dateIni"
                                    required
                                    label="Novo Começo do Evento"
                                    type="datetime-local"
                                    inputProps={
                                        {
                                            min: minDate[0]+":"+minDate[1]
                                        }
                                    }
                                    className="editField"
                                    onChange={ handleChangeBegin }
                                    value={(datetimeBeginEdit || '').toString().substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="dateEnd"
                                    required
                                    label="Novo Fim do Evento"
                                    type="datetime-local"
                                    inputProps={
                                        {
                                            min: minDate[0]+":"+minDate[1]
                                        }
                                    }
                                    className="editField"
                                    onChange={ handleChangeEnd }
                                    value={(datetimeEndEdit || '').toString().substring(0, 16)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                            :
                            <CircularProgress />
                        }
                    </DialogContent>

                    <DialogActions className="confirmButtonsContainer">
                        <Button onClick={() => handleCloseEdit()} className="cancelButton">
                            Cancelar
                        </Button>
                        <Button onClick={() => editEvent()} className="defaultButton" autoFocus>
                            Editar
                        </Button>
                    </DialogActions>
                </Dialog>
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
                        <Button onClick={() => editEvent(true)} className="defaultButton" autoFocus>
                            Criar
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default EditEvent;