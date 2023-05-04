import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { lightTheme } from '../../theme';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getDatabase, ref, query, push, remove, onValue, orderByChild} from "firebase/database";
import { where } from 'firebase/firestore';
import { getAuth, currentUser } from 'firebase/auth';


const Events = () => {
	const theme = useTheme(); 
	//const date = new Date();
	//const day = date.getDate();
	const user = getAuth().currentUser; 
	const db = getDatabase(); 
	let eventsTemp = [];
    const [events, setEvents] = useState([]);
	const [requests, setRequests] = useState([]);
	const [reqId, setReqId] = useState([]);
	const [sender, setSender] = useState([]);
	const [eventReqInfo, setEventReqInfo] = useState([]);
	let requestsTemp = [];
	let reqIdTemp = [];
	let senderTemp = [];
	let eventReqInfoTemp = [];
	/*let newEvents = [];  Recent events array */
	
	/**
     * accepts contact request
     * @param {} req - email of sending user
     */
    function acceptRequest(req) {
        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'eventreq' && childSnapshot.child("from").val() == findUid(req)) {
                    // adds event to your events list
                    push(ref(db, 'users/' + user.uid + '/events'), {
						title: eventReqInfo.title,
						allday: eventReqInfo.allday,
						start: eventReqInfo.start,
						end: eventReqInfo.end,
						repeat: eventReqInfo.repeatlevel,
						invite: findEmail(sender),
						location: eventReqInfo.location
                    });


                    remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
                }
            });
        });
    }
	
	 /**
     * @param {*} em 
     * @returns uid of user associated with email
     */
    function findUid(em) {
        let theirUid;
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let email = childSnapshot.child("profile").child("email").val();
                if (em == email) {
                    theirUid = childSnapshot.key;
                }
            });
        });

        return theirUid;
    }

    /**
     * denies contact request
     * @param {*} req - email fo sending user
     */
    function denyRequest(req) {
        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'req' && childSnapshot.child("from").val() == findUid(req)) {
                    remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
                }
            });
        });
    }

	/**
     * 
     * @returns html for every event request you currently have
     */
    function DisplayRequests() {
        return (
            <div>
                {requests.map((req, i) => (
                    <ListGroup.Item>
                    <div>{req} </div>
					<div> Event Name:{eventReqInfo.title} </div>
					<div> Sender: {findEmail(sender[i])} </div>
                    <div style={{padding:5}}>
                        {' '}
                        <Button variant="success" onClick={() => acceptRequest(req)}>Accept</Button>{' '} <Button variant="danger" onClick={() => denyRequest(req)}>Deny</Button>{' '}
                    </div>

                    </ListGroup.Item>
                ))}
            </div>
        );
    }
	
	/**
     * @param {*} uid 
     * @returns false if request already exists in database, true otherwise
     */
    function reqCheck(uid) {
        let req = true;
        onValue(ref(db, 'users/' + uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'eventreq' && childSnapshot.child("from").val() == user.uid) {
                    req = false;
                }
            });
        });

        return req;
    }
	
	/**
     * 
     * @param {*} uid 
     * @returns email associated with given uid
     */
    function findEmail(uid) {
        let theirEmail;
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (uid == childSnapshot.key) {
                    theirEmail = childSnapshot.child('profile').child('email').val();
                }
            });
        });

        return theirEmail;
    }

    useEffect(() => {
        const db = getDatabase();  
        const dataRef = query(ref(db, 'users/' + user.uid + '/events'), orderByChild('start'));
		const dataRef2 = query(ref(db, 'users/' + user.uid + '/notifications'));
		
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
		
		onValue(dataRef2, (snapshot) => {
            snapshot.forEach(childSnapshot => {
					if(reqCheck(user.uid) == true){
						let id = childSnapshot.key;
						let reqTitle = childSnapshot.val().event;
						let sender = childSnapshot.val().from;
						let title = childSnapshot.val().title;
						let start = childSnapshot.val().start;
						let end = childSnapshot.val().end;
						let location = childSnapshot.val().location;
						let allday = childSnapshot.val().allday;
						let repeat = childSnapshot.val().repeat;
						requestsTemp.push(reqTitle);
						reqIdTemp.push(id);
						senderTemp.push(sender);
						eventReqInfoTemp.push({"title": title, "allday": allday, "start": start, "end": end, "repeat": repeat, "location": location});
					}

            });
            setRequests(requestsTemp);
            requestsTemp = [];
			setReqId(reqIdTemp);
			reqIdTemp = [];
			
			setSender(senderTemp);
			senderTemp = [];
			setEventReqInfo(eventReqInfoTemp);
			eventReqInfoTemp = [];
			
		});
		}, [user]);
	/*newEvents = events.filter(events => events.start !== day);*/
	
    return (
        <div className="pageLight">
			<div className="tabList">
				<Tabs
				defaultActiveKey="first"
				id="events-tabs"
				className="mb-3"
				>
					<Tab eventKey="first" title="All Events"> {/* Got it to display the recieved data, need to implement recent, weekly, and monthly settings. */}
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
					<Tab eventKey="second" title="Event Invites"> {/* Got it to display the recieved data, need to implement recent, weekly, and monthly settings. */}
						<DisplayRequests />
					</Tab>
					{/*<Tab eventKey="second" title="Weekly">
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
					</Tab>*/}
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