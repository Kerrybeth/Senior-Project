import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../App.css';
import { useSelector } from 'react-redux';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import { getDatabase, ref, onValue, set, update } from "firebase/database";

const EventPage = () => {

    const { user, error, sucess } = useSelector(
		(state) => state.user
	)

    const location = useLocation(); // React Hook
    const eventID = (location.pathname).slice(7);
    //alert(eventID);

    const db = getDatabase();
    const dataRef = (ref(db, 'users/' + user.uid + '/events'));
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [location2, setLocation2] = useState("");

  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                //alert(childSnapshot.key);
                let i = childSnapshot.key;
                if (eventID == i) {
                    setTitle(childSnapshot.val().title);
                    setStart(childSnapshot.val().start);
                    setEnd(childSnapshot.val().end);
                    setLocation2(childSnapshot.val().location);
                }
            });
        });
    }, []);

    return(
        <ListGroup.Item>
            <div>
                <br />
                <h2>Event Name: {title}</h2>
                Start Date and Time: {start}
                <br />
                End Date and Time: {end}
                <br />
                Location: {location2}
            </div>
        </ListGroup.Item>
        );
}

export default EventPage;  