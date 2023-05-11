import React, { useState, useEffect } from 'react';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';

const CreateEvents = () => { {/* If we have time, getting form validation to work would be nice.*/}
	const navigate = useNavigate();
	const [events, setEvents] = useState('');
	const [title, setTitle] = useState(null);
	const [allday, setAllday] = useState(false);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [repeatlevel, setRepeatlevel] = useState('Does not repeat');
	const [invite, setInvite] = useState('Select People');
	const [location, setLocation] = useState(null);
	const {register, handleSubmit} = useForm();
	const user = getAuth().currentUser;  
    const db = getDatabase(); 
	const [users, setUsers] = useState([]);
	const [id, setId] = useState([]);
	let usersTemp = [];
	let idTemp = [];
	let eventId = [];
	let invitee;
	
	function submitForm(event){ 
		for (let i = 0; i <id.length; i++) {
			let inviteConcat = invite.toString();
			/*console.log(users[i]); */
			if(users[i] = inviteConcat){
				invitee = id[i];
			}
		}
		push(ref(db, 'users/' + user.uid + '/events'), {
            title: title,
			allday: allday,
            start: start,
            end: end,
			repeat: repeatlevel,
			invite: invite,
			location: location,
			color: 'purple'
        });
		onValue(ref(db, 'users/' + user.uid + '/events'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                eventId = childSnapshot.key;
            });
		});
		setEvents('');
		setTitle('');
		setAllday('');
		setStart('');
		setEnd('');
		setRepeatlevel('');
		setInvite('');
		setLocation('');
		/*console.log(invitee);
		console.log(eventId); */
		sendInvite(findUid(invite));
		navigate("/Events");
	};
	/**
	* sends event invite to chosen member from contacts list
	* @param {*} invitee - the user id to send invite to.
	*/
	function sendInvite(invitee) {
			if (reqCheck(invitee) && invitee != null) {
				push(ref(db, 'users/' + invitee + '/notifications'), {
					type:'eventreq',
					event: eventId,
					title: title,
					allday: allday,
					start: start,
					end: end,
					repeat: repeatlevel,
					location: location,
					from:user.uid,
					body: "You got an invite to a group event"
				}); 
			} 
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
	
	useEffect(() => {
		 onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let name = childSnapshot.val().name;
				let id = childSnapshot.val().uid;
                usersTemp.push(name);
				idTemp.push(id);
            });
    
            setUsers(usersTemp);
            usersTemp = [];
			setId(idTemp);
			idTemp = [];
        });
	}, [user]);
	
	return (
	<div class='pageLight2'>
		<Box>
		<br></br>
		<br></br>
			<Typography variant = "h1" style={{ color: 'black'}}>
			Create Event
			</Typography>
			<br></br>
		</Box>
		<ListGroup>
			<ListGroup.Item>
				<Form onSubmit={handleSubmit(submitForm)}>
					<Typography variant="h3" style={{ 
							color: 'black', 
							justifyContent: 'left', 
							alignItems: 'left'
					}}>
					<Form.Group>
						<Form.Label> Event Name:</Form.Label>
						<Form.Control type="text" {...register('title', { required: true, maxLength: 20})} onChange={(event) => setTitle(event.target.value)} placeholder="Enter Name"/>
							{//<Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
							}
					</Form.Group>
					<Form.Check type="switch" {...register('allday')} onChange={(event) => setAllday(event.target.checked)} label="All-day"/> 
					<Form.Group>
						<Form.Label> Start Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local"  {...register('start', { required: true})} onChange={(event) => setStart(event.target.value)}></input>
							{//<Form.Control.Feedback type="invalid">Please input a start date and time.</Form.Control.Feedback>
							}
						<br/>
						<Form.Label> End Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" {...register('end', { required: true})} onChange={(event) => setEnd(event.target.value)}></input>
							{//<Form.Control.Feedback type="invalid">Please input a end date and time.</Form.Control.Feedback>
							}
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Repeatability:
						</Form.Label>
						<Form.Select  {...register('repeatlevel')} onChange={(event) => setRepeatlevel(event.target.value)}> 
							<option>Does not repeat</option>
							<option>Every day</option>
							<option>Every week</option>
							<option>Every month</option>
							<option>Every year</option>
						</Form.Select>
						{//<Form.Control.Feedback type="invalid">Please choose an option.</Form.Control.Feedback>
						}
					</Form.Group>
					<Form.Group>
						<Form.Label> Invite People: </Form.Label>
						<Form.Select {...register('invite')} onChange={(event) => setInvite(event.target.value)}> {/*Needs implementation.*/}
							<option>Select People</option>
							{users.map((users) => {
								return (
								<option>{users}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label> Location:</Form.Label>
						<Form.Control type="text" {...register('location', {maxLength: 20})} onChange={(event) => setLocation(event.target.value)} placeholder="Enter Location" />
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