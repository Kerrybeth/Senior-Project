import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../App.css';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

export const Calendar = () => {
    const { user, success } = useSelector(
        (state) => state.user
      );

    const navigate = useNavigate();
    // local event storage
    let eventsTemp = [];
    const [events, setEvents] = useState([]);
    let eventidTemp = [];
    const [eventid, setEventID] = useState([]);
    let idTemp = [];
    const [groupIds, setGroupIds] = useState([]);

    useEffect(() => {

        // firebase things
        const db = getDatabase();
        const dataRef = ref(db, 'users/' + user.uid + '/events');
        const dataRef2 = ref(db, 'groups/');
        let idval = 0;

        // populate array with event information, called every time the db updates
        if (user != null || user != undefined) {
            onValue(dataRef, (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    let title = childSnapshot.val().title || '';
                    let start = childSnapshot.val().start;
                    let end = childSnapshot.val().end;
                    let evId = childSnapshot.key;
                    let color = childSnapshot.val().color;

                    eventsTemp.push({ "title": title, "start": start, "end": end, "id": idval, "color": color});
                    eventidTemp.push(evId);
                    idval++;
                });
            });
        }

        // find groups you're apart of
        if (user != null || user != undefined) {
            onValue(dataRef2, (snapshot) => {
                snapshot.forEach(childSnapshot => {
                        childSnapshot.forEach(groupAt => {
                            if (groupAt.key === "members") {
                                groupAt.forEach(member => {
                                    if (user.uid === member.val()) {
                                        let groupid2 = childSnapshot.key;
                                        idTemp.push(groupid2);
                                    }
                                })
                            }
                        });
                    });

            setGroupIds(idTemp);
            });
        }

        // find group events
        idTemp.forEach(gid => {
            onValue(ref(db, `groups/${gid}/events`), (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    let title = childSnapshot.val().title || '';
                    let start = childSnapshot.val().start;
                    let end = childSnapshot.val().end;
                    let evId = childSnapshot.key;
                    let color = childSnapshot.val().color;
    
                    eventsTemp.push({ "title": title, "start": start, "end": end, "id": idval, "color": color});
                    eventidTemp.push(evId);
                    idval++;
                });
            });
        });
            setEventID(eventidTemp);
            setEvents(eventsTemp);
            eventsTemp = [];
            eventidTemp = [];
            idTemp = [];
    }, []);

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
        />
    );

};