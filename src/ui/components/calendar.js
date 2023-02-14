import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { useUserAuth } from '../auth/UserAuthContext';
import { getDatabase, ref, set } from "firebase/database";

export default class Calendar extends React.Component {
    state = {
        currentEvents: []
    }

    render() {
        return (
        <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            dateClick={this.handleDateClick}
            editable={true}
            eventContent={renderEventContent}
            eventsSet={this.handleEvents}
        />
    )
    }

    handleDateClick = (arg) => {
        let user = useUserAuth();
        this.handleRefresh();   
        const db = getDatabase();   
        alert("clickerino");
        set(ref(db, 'users/' + user.uid + '/events'), {
            title: 'test',
            start: arg.dateStr
        });
        alert("clickerino");
    }

    handleRefresh = () => {
        this.setState({});
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent (eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.title}</i>
        </>
    )
}