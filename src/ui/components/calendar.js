import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";
import { getAuth, currentUser, onAuthStateChanged } from 'firebase/auth';

export const Calendar = () => {
    const user = useContext(userAuthContext);
    const eventsTemp = [];
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // firebase things
        const db = getDatabase();  
        const dataRef = ref(db, 'users/' + user.user.uid + '/events');

        // populate array with event information, called every time the db updates
        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let title = childSnapshot.val().title;
                let start = childSnapshot.val().start;
                let end = childSnapshot.val().end;

                eventsTemp.push({"title": title, "start": start, "end": end});
            });

            setEvents(eventsTemp);
            eventsTemp = [];
        });
    });

    const handleDateClick = (arg) => {
        const user = getAuth().currentUser;  
        const db = getDatabase();   

        // push event into db
        push(ref(db, 'users/' + user.uid + '/events'), {
            title: 'test',
            start: arg.dateStr,
            end: '2023-03-10'
        });
    }

// function renderEventContent (eventInfo) {
//     return (
//         <>
//             <b>{eventInfo.timeText}</b>
//             <i>{eventInfo.title}</i>
//         </>
//     )
// }

return (
    <FullCalendar 
    plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
    headerToolbar= {{
        left: "today prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
    }}
    initialView="dayGridMonth"
    dateClick={handleDateClick}
    editable={true}
    selectable
    // eventContent={renderEventContent}
    events={events}
    />
);

};