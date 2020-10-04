import React, { useState, useEffect } from 'react';

//Material Ui
import { Button, CircularProgress } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//Css
import './styles.css';

//Components
import Calendar from '../../components/calendar';
import EventHolder from '../../components/event-holder';

//importing firebase 
import firebase from '../../firebase';

function HomeComponent() {

    //variable to open newEvent
    const [openNewEvent, setOpenNewEvent] = useState(false);

    //variable to store all data
    const [userEvents, setUserEvents] = useState([]);

    //variable to set on the Loader
    const [loader, setLoader] = useState( true );

    //openNewEvent function
    function toggleNewEvent(){
        setOpenNewEvent(openNewEvent => !openNewEvent)
    }

    async function getDataFromFirebase(){
        setUserEvents(await firebase.getEventData());
        setLoader(false);
    }

    //Get all event data 
    useEffect(() => {
        getDataFromFirebase();
    }, []);

    return loader !== true ? (
        <div id="profile">
            { !openNewEvent ?
                <div className="newButton">
                    <Button onClick={() => toggleNewEvent()} id="toggleNewEvent" className="successAlert">
                        Novo Evento
                    </Button>
                </div>
                :
                <div className="actions">
                    <Calendar getDataFromFirebase={getDataFromFirebase} toggleNewEvent={toggleNewEvent}/>
                </div>
            }
           <div className="eventList">
                {userEvents.map((event, id) =>
                    <EventHolder getDataFromFirebase={getDataFromFirebase} key={id} eventData={event} />
                )}
           </div>
           
        </div>
    ) : <div id="loader" > <CircularProgress /> </div>;
}

export default HomeComponent;