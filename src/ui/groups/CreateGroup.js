import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateGroup = () => {
	return (
	<div>
		<Box>
			<Typography variant = "h1" style={{ color: 'black', textDecoration: 'underline'}}>
			Create Group
			</Typography>
		</Box>
		<ListGroup>
			<ListGroup.Item>
				<Form>
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
					</Form.Group>
					<Form.Group>
						<Form.Label> Location:</Form.Label>
						<Form.Control type="text" placeholder="Enter Location" />
					</Form.Group>
					</Typography>
				</Form>
			</ListGroup.Item>
		</ListGroup>
	</div>
	);
}

export default CreateGroup;