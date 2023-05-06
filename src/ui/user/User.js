import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Box, Stack} from "@mui/material";

const User = () => {
	const { user, sucess } = useSelector(
		(state) => state.user
	)

	const [data, setData] = useState("");
	const [timeRanges, setTimeRanges] = useState([]);

	const [img, setImg] = useState('');
	
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const db = getDatabase(); 

	useEffect(() => {

        //const db = getDatabase();  
        const dataRef = ref(db, 'users/' + user.uid + '/profile');
		const dataRefAv = ref(db, 'users/' + user.uid + '/profile' + '/availability' + '/availability');

        onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			if (data.name == null) {
				let namey = "";
				update(ref(db, 'users/' + user.uid + '/profile'), {
					name: namey
				});
			} else if (data.bio == null) {
				let bio = "";
				update(ref(db, 'users/' + user.uid + '/profile'), {
					bio: bio
				});
			} else if (data.image == null) {
				let image = "";
				update(ref(db, 'users/' + user.uid + '/profile'), {
					image: image
				});
			} else {
				setData(data);
			}
        });

		//data[0].whatever
		onValue(dataRefAv, (snapshot) => {
			const data = snapshot.val();
			const dataArray = [];
			const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

			for (let dayIndex in data) {
				const dayOfWeek = daysOfWeek[dayIndex];
				const { start, end } = data[dayIndex];
				dataArray.push({
					dayOfWeek,
					start: start,
					end: end
				});
			}
			setTimeRanges(dataArray);
		});

    }, []);

	function handleImage(event) {
		event.preventDefault();
		alert("hi");

		//const db = getDatabase(); 
		update(ref(db, 'users/' + user.uid + '/profile'), {
			image: img,
        });

		setImg('');
	}

	return (
		<div>
			<Box component='button' sx={{border: '0', backgroundColor: 'transparent'}} onClick={handleShow} style={{ minHeight: '150px', minWidth: '150px', position: 'relative', top: '100px', maxHeight:'150px', maxWidth: '150px' }}>
				<Image id='profilepic' src={data.image} roundedCircle />
			</Box>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
          			<Modal.Title>Paste a link to an image</Modal.Title>
        		</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleImage}>
					<Form.Control type="text" value={img} onChange={(event) => setImg(event.target.value)}/>
					<Button variant="primary" type='submit' style={{padding: '10px'}} onClick={handleClose}>
            			Save Changes
          			</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<ListGroup style={{
				display: 'flex',
				minHeight: '100px',
				maxWidth: '1000px',
				position: 'fixed',
				top: '100px',
				right: '100px'
			}}>
				<ListGroup.Item>
					<Typography variant="h3" style={{
						color: 'black',
						justifyContent: 'left',
						alignItems: 'left',
						overflowWrap: 'break-word'
					}}>
						Name: {data.name}
						<br />
						Bio: {data.bio}
						<br />
					</Typography>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/UserEdit">
						<Button variant="contained" sx={{ maxHeight: '50px', }}>
							<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
								Edit
							</Typography>
						</Button>
					</Link>
				</ListGroup.Item>
			</ListGroup>
			<Box>
				<Typography variant="h3" style={{ position: 'relative', top: '200px' }}>
					Availability
					<Link to="/AvailEdit">
						<Button variant="contained" sx={{ maxHeight: '50px', }}>
							<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
								Edit
							</Typography>
						</Button>
					</Link>
					{timeRanges.map(({ dayOfWeek, start, end }) => (
        			<div key={dayOfWeek}>
          			<h2>{dayOfWeek}</h2>
          			<p>Start time: {start}</p>
          			<p>End time: {end}</p>
					</div>
      			))}
				</Typography>
			</Box>
		</div>
	);
}

export default User; 