import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

const UserEdit = () => {
    return (
		<div>
			<Box component='button' style={{minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px'}}>
				<Image src= "logo.svg" roundedCircle />
			</Box>
			<ListGroup style={{
					display: 'flex',
					minHeight: '100px',
					maxWidth: '1000px',
					position: 'fixed', 
					top: '100px', 
					right: '100px'
			}}>
				<ListGroup.Item>
					<Form>
						<Typography variant="h3" style={{ 
							color: 'black', 
							justifyContent: 'left', 
							alignItems: 'left'
						}}>
							<Form.Group> {/* Place controlId here */}
								<Form.Label> Name: </Form.Label>
								<Form.Control type="text" placeholder="Enter Name" />
							</Form.Group>
							<Form.Group>
								<Form.Label> Bio: </Form.Label>
								<Form.Control type="text" placeholder="Enter Bio" />
							</Form.Group>
							<Form.Group>
								<Form.Label> Description: </Form.Label>
								<Form.Control type="textarea" placeholder="Enter Description" style={{Height: '200px'}}/>
							</Form.Group>
						</Typography>
					</Form>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to= "/User">
						<button style={{maxHeight:'50px',}}>
							<Typography variant ="h4" style={{ color: 'black', justifyContent: 'right', alignItems: 'right'}}>
							Back
							</Typography>
						</button>
					</Link>
				</ListGroup.Item>
			</ListGroup>
			<Box>
				<Typography variant ="h1" style={{ color: 'black', position: 'relative', top: '200px'}}>
				Availability
				</Typography>
			</Box>
		</div>
    );
}

export default UserEdit; 