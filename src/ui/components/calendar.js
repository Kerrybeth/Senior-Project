import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';


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
        let calendarApi = arg.view.calendar;
        if (arg.allday == false) {
            //timeStart = arg.dateStr + "12:30:00";
            //timeEnd = arg.dateStr + "13:00:00";
            var date = new Date(arg.dateStr);
            calendarApi.addEvent({
                title: 'test',
                start: arg.dateStr + "12:30:00",
                end: arg.dateStr + "13:00:00",
                allday: false
            });
        }
        alert('clicked');
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