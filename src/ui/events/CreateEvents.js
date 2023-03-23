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
	/*const [validate, setValidated] = useState(false);*/
	const [events, setEvents] = useState('');
	const [title, setTitle] = useState('');
	const [allday, setAllday] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [repeatlevel, setRepeatlevel] = useState('');
	const [invite, setInvite] = useState('');
	const [location, setLocation] = useState('');
	
	
	
	function handleSubmit(event){
		console.log("test");
		const user = getAuth().currentUser;  
        const db = getDatabase();  
		set(ref(db, 'users/' + user.uid + '/events'), {
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
		navigate("/Events");
		
		/*const form = event.currentTarget;
		if (form.checkValidity() === false){
			event.preventDefault();
			event.stopPropagation();
		}
		
		setValidated(true);*/
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
				<Form onSubmit={handleSubmit}>
					<Typography variant="h3" style={{ 
							color: 'black', 
							justifyContent: 'left', 
							alignItems: 'left'
					}}>
					<Form.Group>
						<Form.Label> Event Name:</Form.Label>
						<Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter Name" />
					</Form.Group>
					<Form.Check type="switch" value={allday} onChange={(event) => setAllday(event.target.value)} label="All-day"/>
					<Form.Group>
						<Form.Label> Start Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)}></input>
						<br/>
						<Form.Label> End Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" value={end} onChange={(event) => setEnd(event.target.value)}></input>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Repeatability:
						</Form.Label>
						<Form.Select value={repeatlevel} onChange={(event) => setRepeatlevel(event.target.value)}> 
							<option>Does not repeat</option>
							<option>Every day</option>
							<option>Every week</option>
							<option>Every month</option>
							<option>Every year</option>
						</Form.Select>
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