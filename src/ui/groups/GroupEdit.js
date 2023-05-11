import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { getDatabase, ref, set, update, push, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';

const GroupEdit = () => {

	const { user, error, sucess } = useSelector(
		(state) => state.user
	)
	const navigate = useNavigate();
    const location = useLocation();
    const groupId = (location.pathname).slice(8, -5);
    const db = getDatabase();

	const [gname, setGName] = useState('');
	const [desc, setDesc] = useState('');
    const [admins, setAdmins] = useState([]);
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [ids, setIds] = useState([]);
	const [invite, setInvite] = useState("");
    let usersTemp = [];
    let idsTemp = [];
	let adminsTemp = [];

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
           	snapshot.forEach(childSnapshot => {
               let name = childSnapshot.val().name;
               let id = childSnapshot.val().uid;
               usersTemp.push(name);
               idsTemp.push(id);
           	});
   
           	setUsers(usersTemp);
           	usersTemp = [];
           	setIds(idsTemp);
           	idsTemp = [];
       	});

		onValue(ref(db, `groups/${groupId}/admins`), (snapshot) => {
			snapshot.forEach(childSnapshot => {
				let admins = childSnapshot.val();
				adminsTemp.push(admins);
			});
			
			setAdmins(adminsTemp);
			adminsTemp = [];
		})
   },);

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

	function reqCheck(uid) {
	let req = true;
		onValue(ref(db, 'users/' + uid + '/notifications'), (snapshot) => {
			snapshot.forEach(childSnapshot => {
				if (childSnapshot.child("type").val() == 'groupinv' && childSnapshot.child("from").val() == user.uid) {
					req = false;
				}
			});
		});
		return req;
	}

	function sendInv () {
		alert(invite);
		alert(findUid(invite));
		let theirUid = findUid(invite);
		if (reqCheck(theirUid) && theirUid != null) {
			alert("im here");
			push(ref(db, 'users/' + theirUid + '/notifications'), {
				type:'groupinv',
				from: user.uid,
				groupid: groupId
			}); 
		} 
	}

	function handleSubmit(event) {
		console.log(gname);
		event.preventDefault();

		sendInv();

		update(ref(db, `groups/${groupId}`), {
			name: gname,
			desc: desc
		});

		navigate(`/groups/${groupId}`);
	};

	return (
		<div>
        <br></br>
			<Box>
				<Typography variant="h1" style={{ color: 'black', textDecoration: 'underline' }}>
					Edit Group
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
								<Form.Label> Group Name:</Form.Label>
								<Form.Control type="text" placeholder="Enter Name" value={gname} onChange={(event) => setGName(event.target.value)} />
							</Form.Group>
							<Form.Group>
								<Form.Label> Description: </Form.Label>
								<Form.Control type="textarea" placeholder="Enter Description" value={desc} onChange={(event) => setDesc(event.target.value)} style={{ minHeight: '200px' }} />
							</Form.Group>
							<Form.Group>
						        <Form.Label> Invite People: </Form.Label>
						        <Form.Select onChange={(event) => setInvite(event.target.value)}> {/*Needs implementation.*/}
							        <option>Select People</option>
							            {users.map((users) => {
								            return (
								                <option>{users}</option>
								            )
							            })}
						        </Form.Select>
					        </Form.Group>
							<Button type="submit">Save Changes</Button>
						</Typography>
					</Form>
				</ListGroup.Item>
				<ListGroup.Item>
                    <Link to={`/groups/${groupId}`}>
						<Button style={{ maxHeight: '50px', }}>
							<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
								Back
							</Typography>
						</Button>
					</Link>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}

export default GroupEdit;