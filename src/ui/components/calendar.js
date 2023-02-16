import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { useUserAuth } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push } from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';

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

    handleDateClick = (arg) => {
        const user = getAuth().currentUser;
        this.handleRefresh();   
        const db = getDatabase();   
        alert("clickerino");
        push(ref(db, 'users/' + user.uid + '/events'), {
            title: 'test',
            start: arg.dateStr
        });
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