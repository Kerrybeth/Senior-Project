import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";
import { useContext } from "react";

const CreateGroup = () => {
	const user = useContext(userAuthContext);

	const handleSubmit = (arg) => { 
        const db = getDatabase();
		alert(arg.name);

        // push event into db
        push(ref(db, 'groups/'), {
            name: arg.name,
			owner: user.user.uid
        });
    }

	return (
	<div>
		<Box>
			<Typography variant = "h1" style={{ color: 'black', textDecoration: 'underline'}}>
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
					<Form.Group controlId="name">
						<Form.Label> Group Name:</Form.Label>
						<Form.Control type="text" placeholder="Enter Name" />
					</Form.Group>
					<Form.Group controlId="desc">
						<Form.Label> Description: </Form.Label>
						<Form.Control type="textarea" placeholder="Enter Description" style={{minHeight:'200px'}}/>
					</Form.Group>
					<Form.Group controlId="inv">
						<Form.Label> Invite People: </Form.Label>
						<Form.Select> 
							<option>Select People</option>
						</Form.Select>
					</Form.Group>
					<Form.Group controlId="loc">
						<Form.Label> Location:</Form.Label>
						<Form.Control type="text" placeholder="Enter Location" />
					</Form.Group>
					<Button type="submit">Create Group</Button>
					</Typography>
				</Form>
			</ListGroup.Item>
			<ListGroup.Item>
				<Link to= "/Groups">
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

export default CreateGroup;