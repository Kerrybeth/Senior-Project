import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateGroup = () => {

	const handleSubmit = (arg) => { 
        const db = getDatabase();
		user = 

        // push event into db
        push(ref(db, 'users/' + user.user.uid + '/events'), {
            title: 'test',
            start: arg.dateStr,
            end: '2023-03-10'
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
					<Form.Group>
						<Form.Label> Group Name:</Form.Label>
						<Form.Control type="text" placeholder="Enter Name" />
					</Form.Group>
					<Form.Group>
						<Form.Label> Description: </Form.Label>
						<Form.Control type="textarea" placeholder="Enter Description" style={{minHeight:'200px'}}/>
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