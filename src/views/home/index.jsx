import React, { useState } from 'react';

//Material Ui
import { Button } from '@material-ui/core';

//Material Ui Icons
import {  } from '@material-ui/icons';

//Css
import './styles.css';

//Components
import Calendar from '../../components/calendar';
import EventHolder from '../../components/event-holder';

function HomeComponent() {

    //variable to open newEvent
    const [openNewEvent, setOpenNewEvent] = useState(false);

    //openNewEvent function
    function toggleNewEvent(){
        setOpenNewEvent(openNewEvent => !openNewEvent)
    }

    return (
        <div id="profile">
            { !openNewEvent ?
                <div className="newButton">
                    <Button onClick={() => toggleNewEvent()} id="toggleNewEvent" className="successAlert">
                        Novo Evento
                    </Button>
                </div>
                :
                <div className="actions">
                    <Calendar toggleNewEvent={toggleNewEvent}/>
                </div>
            }
           
            
            <EventHolder />
        </div>
    )
}

export default HomeComponent;