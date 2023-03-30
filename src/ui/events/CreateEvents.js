import React, { useState } from 'react';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push } from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';

const CreateEvents = () => {
	const navigate = useNavigate();
	const [validated, setValidated] = useState(false);
	const [events, setEvents] = useState('');
	const [title, setTitle] = useState('');
	const [allday, setAllday] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [repeatlevel, setRepeatlevel] = useState('');
	const [invite, setInvite] = useState('');
	const [location, setLocation] = useState('');
	
	
	
	function handleSubmit(event){ {/* Need to figure out how to get default values to not be "".*/}
		console.log("test");
		const user = getAuth().currentUser;  
        const db = getDatabase(); 
		const form = event.currentTarget;
		if (form.checkValidity() === false){
			event.preventDefault();
			event.stopPropagation();
		}
		
		setValidated(true);
		push(ref(db, 'users/' + user.uid + '/events'), {
            title: title,
			allday: allday,
            start: start,
            end: end,
			repeat: repeatlevel,
			invite: invite,
			location: location
        });
		
		setEvents('');
		setTitle('');
		setAllday('');
		setStart('');
		setEnd('');
		setRepeatlevel('');
		setInvite('');
		setLocation('');
		event.preventDefault();
		navigate("/Events");
	};
	
	return (
	<div>
		<Box>
			<Typography variant = "h1" style={{ color: 'black', textDecoration: 'underline'}}>
			Create Event
			</Typography>
		</Box>
		<ListGroup>
			<ListGroup.Item>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Typography variant="h3" style={{ 
							color: 'black', 
							justifyContent: 'left', 
							alignItems: 'left'
					}}>
					<Form.Group>
						<Form.Label> Event Name:</Form.Label>
						<Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="Enter Name"/>
						<Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
					</Form.Group>
					<Form.Check type="switch" id="allday-switch" checked={allday} onChange={(event) => setAllday(event.target.checked)} label="All-day"/> {/*Change into a boolean.*/}
					<Form.Group>
						<Form.Label> Start Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)} required></input>
						<Form.Control.Feedback type="invalid">Please input a start date and time.</Form.Control.Feedback>
						<br/>
						<Form.Label> End Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" value={end} onChange={(event) => setEnd(event.target.value)} required></input>
						<Form.Control.Feedback type="invalid">Please input a end date and time.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Repeatability:
						</Form.Label>
						<Form.Select value={repeatlevel} onChange={(event) => setRepeatlevel(event.target.value)} required> 
							<option defaultValue >Does not repeat</option>
							<option>Every day</option>
							<option>Every week</option>
							<option>Every month</option>
							<option>Every year</option>
						</Form.Select>
						<Form.Control.Feedback type="invalid">Please choose an option.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label> Invite People: </Form.Label>
						<Form.Select value={invite} onChange={(event) => setInvite(event.target.value)}> 
							<option>Select People</option>
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label> Location:</Form.Label>
						<Form.Control type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter Location" />
					</Form.Group>
					<Button type="submit">Create Event</Button>
					</Typography>
				</Form>
			</ListGroup.Item>
			<ListGroup.Item>
				<Link to= "/Events">
					<Button style={{maxHeight:'50px',}}>
						<Typography variant ="h4" style={{ justifyContent: 'right', alignItems: 'right'}}>
						Back
						</Typography>
					</Button>
				</Link>
			</ListGroup.Item>
		</ListGroup>
	</div>
	);
}

export default CreateEvents;