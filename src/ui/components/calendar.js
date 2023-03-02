import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { useUserAuth } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";
import { getAuth, currentUser, onAuthStateChanged } from 'firebase/auth';

const events = [];

export default class Calendar extends React.Component {

    render() {
        return (
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            dateClick={this.handleDateClick}
            editable={true}
            // eventContent={renderEventContent}
            events={events}
        />
    )
    }

    componentDidMount() {
        // firebase things (error with not being able to read user.uid currently)
        const user = getAuth().currentUser;
        const db = getDatabase();  
        const dataRef = ref(db, 'users/' + '4zaGUJWi24fdT48B0TGQ71LFMSx2' + '/events');

        // populate array with event information, called every time the db updates
        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let title = childSnapshot.val().title;
                let start = childSnapshot.val().start;
                events.push({"title": title, "start": start});
            });
        });

        this.handleRefresh();

    }

    handleDateClick = (arg) => {
        const user = getAuth().currentUser;
        this.handleRefresh();   
        const db = getDatabase();   
        alert("clickerino");

        // push event into db
        push(ref(db, 'users/' + user.uid + '/events'), {
            title: 'test',
            start: arg.dateStr
        });

        // update local display
        //updateDisplay();
        alert("clickerino");
    }

    handleRefresh = () => {
        this.setState({});
    }
}

// function renderEventContent (eventInfo) {
//     return (
//         <>
//             <b>{eventInfo.timeText}</b>
//             <i>{eventInfo.title}</i>
//         </>
//     )
// }