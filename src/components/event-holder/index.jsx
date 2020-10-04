import React, { useState } from 'react';
  

//Material Ui
import { Tooltip, Paper, Typography, Chip, IconButton, Dialog, DialogTitle, DialogActions, Button  } from '@material-ui/core';

//Material Ui Icons
import { AlarmOn, AlarmOff, Delete, Create, PriorityHigh } from '@material-ui/icons';

//firebase
import firebase from '../../firebase';

//Components
import EditEvent from '../edit-event'

//Import to use ternary operator inside a react className
import classnames from 'classnames';

//Css
import './styles.css';


function EventHolder({ eventData, getDataFromFirebase }) {

    //dialog variables
    const [openConfirm, setOpenConfirm] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    //funtion to delete a event and repopulate list
    async function deleteEvent(){
        if(openConfirm) {
            await firebase.deleteItem(eventData.id);
            getDataFromFirebase();
            handleCloseConfirm();
        }
    }

    //function to toggle confirm delete modal
    function handleCloseConfirm(){
        setOpenConfirm(openConfirm => ! openConfirm);
    }
    
    //function to toggle edit event modal
    function handleCloseEdit(){
        setOpenEdit(openEdit => ! openEdit);
    }
    
    //getting local date with the right timezone
    let data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    const today = data2.toISOString()
    const todayTimestamp = Math.round(new Date(today).getTime()/1000)


      return (
        <div id="eventHolder">  
            <Paper className={classnames(todayTimestamp > eventData.endDateTimestamp ? "eventPass" :"eventContainer")} elevation={2}>
                <div className="infoContainer">
                    <div className="titleAndDescriptionContainer">
                        <Typography className="eventInfo" id="titleCard">
                            {eventData.title}
                        </Typography>
                        <Typography className="eventInfo" id="description">
                            {eventData.description}
                        </Typography>
                    </div>
                    <div className="timeStampContainer">
                        <Typography component={'span'} id="eventBegin" className="eventDate">
                            <Chip icon={<AlarmOn />} color="primary" label={"Começa às: " + eventData.beginDate + " " + eventData.beginTime} variant="outlined" /> 
                        </Typography>
                        <Typography component={'span'} id="eventEnd" className="eventDate">
                            <Chip icon={<AlarmOff />} color="secondary" label={"Termina às: " + eventData.endDate + " " + eventData.endTime} variant="outlined" />  
                        </Typography>
                    </div>
                </div>
                <div className="actionContainer">
                   <div className="eventButtons">
                            { todayTimestamp < eventData.endDateTimestamp &&
                                <Tooltip className="buttonTooltip" title="Editar">
                                        <IconButton onClick={() => handleCloseEdit()} className="iconButton" color="primary" aria-label="Editar">
                                            <Create id="edit"/>
                                        </IconButton>
                                </Tooltip>
                            }
                        <Tooltip className="buttonTooltip" title="Deletar">
                            <IconButton onClick={() => handleCloseConfirm()} className="iconButton" aria-label="Deletar">
                                <Delete id="delete" />
                            </IconButton>
                        </Tooltip>
                   </div>
                   <div className="EventCommingContainer">
                       {todayTimestamp > eventData.beginDateTimestamp && todayTimestamp < eventData.endDateTimestamp ? <PriorityHigh /> : null} 
                   </div>
                </div>
            </Paper>
                <Dialog
                open={openConfirm}
                onClose={() => handleCloseConfirm()}
                aria-labelledby="Confirmar Remoção"
                >
                    <DialogTitle><span className="confirmTitle" >Deseja mesmo deletar esse evento?"</span></DialogTitle>
                    <DialogActions className="confirmButtonsContainer">
                        <Button onClick={() => handleCloseConfirm()} className="cancelButton">
                            Cancelar
                        </Button>
                        <Button onClick={() => deleteEvent()} className="deleteButton" autoFocus>
                            Deletar
                        </Button>
                    </DialogActions>
                </Dialog>
                { openEdit &&
                    <EditEvent eventData={eventData} handleCloseEdit={handleCloseEdit} getDataFromFirebase={getDataFromFirebase} open={openEdit}/>
                }
        </div>
    )
}

export default EventHolder;