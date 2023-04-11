import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { lightTheme } from '../../theme';
import { useTheme } from '@mui/material/styles';
import { useContext, useState, useEffect } from 'react';
import { userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, query, set, push, onValue} from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';


const Events = () => {
	const theme = useTheme(); 
	const user = useContext(userAuthContext) || '';
	let eventsTemp = [];
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const db = getDatabase();  
        const dataRef = ref(db, 'users/' + user.user.uid + '/events');
		
        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let title = childSnapshot.val().title;
                let start = childSnapshot.val().start;
                let end = childSnapshot.val().end;
				let location = childSnapshot.val().location;

                eventsTemp.push({"title": title, "start": start, "end": end, "location": location});
            });

            setEvents(eventsTemp);
            eventsTemp = [];
        });
    }, [user]);
	
    return (
        <div className="pageLight">
			<div className="tabList">
				<Tabs
				defaultActiveKey="first"
				id="events-tabs"
				className="mb-3"
				>
					<Tab eventKey="first" title="Recent"> {/* Got it to display the recieved data, need to implement recent, weekly, and monthly settings. */}
						<ListGroup>
							{events.map((events) => {
								return(
								<ListGroup.Item>
									<div>
										<h2>{events.title}</h2>
										Start Date and Time: {events.start}
										<br />
										End Date and Time: {events.end}
										<br />
										Location: {events.location}
									</div>
								</ListGroup.Item>
								)
							})}
						</ListGroup>
					</Tab>
					<Tab eventKey="second" title="Weekly">
						<ListGroup>
							{events.map((events) => {
								return(
								<ListGroup.Item>
									<div>
										<h2>{events.title}</h2>
										Start Date and Time: {events.start}
										<br />
										End Date and Time: {events.end}
										<br />
										Location: {events.location}
									</div>
								</ListGroup.Item>
								)
							})}
						</ListGroup>
					</Tab>
					<Tab eventKey="third" title="Monthly">
						<ListGroup>
							{events.map((events) => {
								return(
								<ListGroup.Item>
									<div>
										<h2>{events.title}</h2>
										Start Date and Time: {events.start}
										<br />
										End Date and Time: {events.end}
										<br />
										Location: {events.location}
									</div>
								</ListGroup.Item>
								)
							})}
						</ListGroup>
					</Tab>
				</Tabs>
			</div>
			<Link to="/CreateEvents"> {/* Tried and failed to implement the theme on the buttons in this page. Did not like Mui buttons being used. */}
				<Button variant="secondary">
					Create Event
				</Button>
			</Link>
			<Link to="/CreateGroupEvents">
				<Button variant="secondary">
					Create Group Event
				</Button>
			</Link>
		</div>
    );
}

export default Events; 