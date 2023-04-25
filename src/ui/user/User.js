import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const User = () => {
	const { user, error, sucess } = useSelector(
		(state) => state.user
	)
	const [data, setData] = useState("");
	const [timeRanges, setTimeRanges] = useState([]);

	useEffect(() => {

        const db = getDatabase();  
        const dataRef = ref(db, 'users/' + user.uid + '/profile');
		const dataRefAv = ref(db, 'users/' + user.uid + '/profile' + '/availability' + '/availability');

        onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			if (data.name == null) {
				let namey = "";
				set(ref(db, 'users/' + user.uid + '/profile'), {
					name: namey
				});
			} else if (data.bio == null) {
				let bio = "";
				set(ref(db, 'users/' + user.uid + '/profile'), {
					bio: bio
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

	return (
		<div>
			<Box component='button' style={{ minHeight: '150px', minWidth: '150px', position: 'relative', top: '100px' }}>
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