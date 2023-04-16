import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import Button from '@mui/material/Button';
import { getDatabase, ref, set, update, push, onValue } from "firebase/database";
import { useEffect, useContext, useState } from 'react';
import { useSelector } from "react-redux";

const User = () => {
	const { user, error, sucess } = useSelector(
		(state) => state.user
	)
	const [data, setData] = useState("");

	useEffect(() => {

		if (user != null && user != undefined) {
			const db = getDatabase();
			const dataRef = ref(db, 'users/' + user.uid + '/profile');

			onValue(dataRef, (snapshot) => {
				const data = snapshot.val() || '';
				setData(data);
			});
		}
	}, []);

	return (
		<div>
			<Box component='button' style={{ minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px' }}>
				<Image src="logo.svg" roundedCircle />
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
					<Typography variant="h3" style={{
						color: 'black',
						justifyContent: 'left',
						alignItems: 'left'
					}}>
						Name: {data.name}
						<br />
						<br />
						Bio: {data.bio}
						<br />
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
			{/* <Box>
				<Typography variant="h1" style={{ position: 'relative', top: '200px' }}>
					Availability
				</Typography>
			</Box> */}
		</div>
	);
}
export default User; 