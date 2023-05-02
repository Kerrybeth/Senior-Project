import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../App.css';
import { useSelector } from 'react-redux';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import { getDatabase, ref, onValue, set, update } from "firebase/database";

const UserPage = () => {

    const { user, error, sucess } = useSelector(
		(state) => state.user
	)

    const location = useLocation(); // React Hook
    console.log(location);
    const userID = (location.pathname).slice(6);
    console.log(userID);

    const db = getDatabase();
    const dataRef = ref(db, `users/${userID}/profile`);
    const dataRefAv = ref(db, `users/${userID}/profile/availability/availability`);
    const [data, setData] = useState("");
    const [timeRanges, setTimeRanges] = useState([]);
  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			if (data.name == null) {
				let namey = "";
				update(ref(db, 'users/' + userID + '/profile'), {
					name: namey
				});
			} else if (data.bio == null) {
				let bio = "";
				update(ref(db, 'users/' + userID + '/profile'), {
					bio: bio
				});
			} else {
				setData(data);
			}
        });

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

    // function getContacts() {
    //     onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
    //         snapshot.forEach(childSnapshot => {
    //             setContacts(childSnapshot.val().name);
    //         });
    //     });
    // }

    // function Option() {
    //     return (
    //         <div>
    //         {contacts.map((name) => (
    //             <option value={name}>{name}</option>
    //         ))}
    //         </div>
    //     );
    // }
  
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
				</ListGroup.Item>
			</ListGroup>
			<Box>
				<Typography variant="h3" style={{ position: 'relative', top: '200px' }}>
					Availability
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

export default UserPage;  