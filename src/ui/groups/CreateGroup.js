import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { getDatabase, ref, set, update, push, onValue } from "firebase/database";
import { useContext, useState } from "react";

const CreateGroup = () => {

	const { user, error, sucess } = useSelector(
		(state) => state.isUserLoggedIn
	)
	const navigate = useNavigate();

	const [gname, setGName] = useState('');
	const [desc, setDesc] = useState('');

	function handleSubmit(event) {
		console.log(gname);
		event.preventDefault();

		const db = getDatabase();
		push(ref(db, '/groups'), {
			name: gname,
			owner: user.user.uid,
			admins: [user.user.uid],
			members: [user.user.uid],
			desc: desc
		});

		navigate("/Groups");
	};

	return (
		<div>
			<Box>
				<Typography variant="h1" style={{ color: 'black', textDecoration: 'underline' }}>
					Create Group
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
								<Form.Select>
									<option>Select People</option>
								</Form.Select>
							</Form.Group>
							<Form.Group>
								<Form.Label> Location:</Form.Label>
								<Form.Control type="text" placeholder="Enter Location" />
							</Form.Group>
							<Button type="submit">Create Group</Button>
						</Typography>
					</Form>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/Groups">
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

export default CreateGroup;