import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/Listgroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateEvents = () => {
	return (
	<div>
		<box>
			<Typography variant = "h1" style={{ color: 'black', textDecoration: 'underline'}}>
			Create Event
			</Typography>
		</box>
		<ListGroup>
			<ListGroup.Item>
				<Form>
					<Typography variant="h3" style={{ 
							color: 'black', 
							justifyContent: 'left', 
							alignItems: 'left'
					}}>
					<Form.Group>
						<Form.Label> Event Name:</Form.Label>
						<Form.Control type="text" placeholder="Enter Name" />
					</Form.Group>
					<Form.Check type="switch" label="All-day"/>
					<Form.Group>
						<Form.Label> Start Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="date"></input>
						<br/>
						<Form.Label> End Date: </Form.Label> {/*Should be formatted as yyyy-mm-dd, how it is displayed is browser determined.*/}
						<input type="date"></input>
						<br/>
						<Form.Label> Start Time: </Form.Label>
						<input type="time"></input>
						<br/>
						<Form.Label> End Time: </Form.Label>
						<input type="time"></input>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Repeatability:
						</Form.Label>
						<Form.Select> 
							<option>Does not repeat</option>
							<option>Every day</option>
							<option>Every week</option>
							<option>Every month</option>
							<option>Every year</option>
						</Form.Select>
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