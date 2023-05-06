import React, { useState, useEffect } from 'react';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, onValue} from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';

const CreateGroupEvents = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState(null);
	const [events, setEvents] = useState('');
	const [allday, setAllday] = useState(false);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [repeatlevel, setRepeatlevel] = useState('Does not repeat');
	const [invite, setInvite] = useState('Select People');
	const [location, setLocation] = useState(null);
	const {register, handleSubmit} = useForm();
	let groupsTemp = [];
	let idTemp = [];
	let groupId = null;
    const [groups, setGroups] = useState([]);
	const [id, setId] = useState([]);
	const user = getAuth().currentUser;  
    const db = getDatabase(); 
	
	function submitForm(event){ 
		for (let i = 0; i <id.length; i++) {
			let inviteConcat = invite.toString();
			if (groups[i] == inviteConcat){
				groupId = id[i];
			}
		}
		if (groupId != null){
			push(ref(db, 'groups/' + groupId + '/events'), { 
				title: title,
				allday: allday,
				start: start,
				end: end,
				repeat: repeatlevel,
				invite: invite,
				location: location
			});
		}
		
		 setEvents('');
		 setTitle('');
		 setAllday('');
		 setStart('');
		 setEnd('');
		 setRepeatlevel('');
		 setInvite('');
		 setLocation('');
		 navigate("/Events");
	};
	
	useEffect(() => {
        // firebase things
        const db = getDatabase();  
        const dataRef = ref(db, 'groups/');

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
               if (user.uid === childSnapshot.val().owner) {
                        let name = childSnapshot.val().name;
                        let id = childSnapshot.key;
                        groupsTemp.push(name);
						idTemp.push(id);
                }
            });

            setGroups(groupsTemp);
            groupsTemp = [];
			setId(idTemp);
			idTemp = [];
        });

    }, [user]);
	
	return (
	<div>
		<Box>
			<Typography variant = "h1" style={{ color: 'black', textDecoration: 'underline'}}>
			Create Group Event
			</Typography>
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
					</Form.Group>
					<Form.Check type="switch" {...register('allday')} onChange={(event) => setAllday(event.target.checked)} label="All-day"/> 
					<Form.Group>
						<Form.Label> Start Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local"  {...register('start', { required: true})} onChange={(event) => setStart(event.target.value)}></input>
						<br/>
						<Form.Label> End Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="datetime-local" {...register('end', { required: true})} onChange={(event) => setEnd(event.target.value)}></input>
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
					</Form.Group>
					<Form.Group>
						<Form.Label> Invite Groups: </Form.Label>
						<Form.Select {...register('invite')} onChange={(event) => setInvite(event.target.value)}> {/*Needs implementation.*/}
							<option>Select Group</option>
							{groups.map((groups) => {
								return(
								<option>{groups}</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label value={location} onChange={(event) => setLocation(event.target.value)}> Location:</Form.Label>
						<Form.Control type="text" {...register('location', {maxLength: 20})} onChange={(event) => setLocation(event.target.value)} placeholder="Enter Location" />
					</Form.Group>
					<Button type="submit">Create Group Event</Button>
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

export default CreateGroupEvents;