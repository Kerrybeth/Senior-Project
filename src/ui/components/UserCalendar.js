import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";


export const UserCalendar = ({uid}) => {

    const navigate = useNavigate();
    // local event storage

    let eventsTemp = [];
    const [events, setEvents] = useState([]);
    let eventidTemp = [];
    const [eventid, setEventID] = useState([]);

    useEffect(() => {

        // firebase things
        const db = getDatabase();
        const dataRef = ref(db, 'users/' + uid + '/events');

        // populate array with event information, called every time the db updates
        if (uid != null) {
            let idval = 0;
            onValue(dataRef, (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    let title = childSnapshot.val().title || '';
                    let start = childSnapshot.val().start;
                    let end = childSnapshot.val().end;
                    let evId = childSnapshot.key;

                    eventsTemp.push({ "title": title, "start": start, "end": end, "id": idval});
                    eventidTemp.push(evId);
                    idval++;
                });

                setEventID(eventidTemp);
                setEvents(eventsTemp);
                eventsTemp = [];
                eventidTemp = [];
            });
        }
    }, [uid]);

    const handleEventClick = (arg) => {
        navigate("/event/" + eventid[arg.event.id]);
        //<Link to={`/event/${eventid[arg.event.id]}`}></Link>
    }

    // const handleDateClick = (arg) => {
    //     const db = getDatabase();

    //     // push event into db
    //     if (user != null) {
    //         push(ref(db, 'users/' + user.uid + '/events'), {
    //             title: 'test',
    //             start: arg.dateStr,
    //             end: '2023-03-10'
    //         });
    //     }
    // }

    // function renderEventContent (eventInfo) {
    //     return (
    //         <>
    //             <b>{eventInfo.timeText}</b>
    //             <i>{eventInfo.title}</i>
    //         </>
    //     )
    // }

    return (
        <Box m={1}>
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
                left: "today prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            initialView="dayGridMonth"
            //dateClick={handleDateClick}
            editable={true}
            selectable
            eventClick={handleEventClick}
            // eventContent={renderEventContent}
            events={events}
            businessHours={true}
        />
        </Box>
    );
};