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
        //eventadd(arg);
        //this.handleRefresh();
        // let calendarApi = arg.view.calendar;
        // calendarApi.addEvent({
        //     title: 'test',
        //     start: arg.dateStr,
        //     end: arg.dateStr,
        //     allday: arg.allday
        // });
        //alert('clicked');
        
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

function eventadd (arg) {
    return (
        <>
            <p>
                testing
            </p>
        </>
    )
}