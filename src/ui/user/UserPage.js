import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../App.css';
import { useSelector } from 'react-redux';
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { UserCalendar } from "../components/UserCalendar";

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
			setData(data);
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
        <div class="pageLight2">
			<div>
			<Box component='button' sx={{border: '0', backgroundColor: 'transparent', float: 'left'}} style={{ minHeight: '150px', minWidth: '150px', position: 'relative', top: '75px', maxHeight:'150px', maxWidth: '150px' }}>
				<Image id='profilepic' src={data.image} roundedCircle />
			</Box>
			<div style={{
				display: 'flex',
				minHeight: '100px',
				maxWidth: '15vw',
				float: 'center',
				paddingTop: '100px',
				paddingLeft: '4vw',
				paddingRight: '2vw'
			}}>
				<ListGroup.Item>
					<Typography variant="h3" style={{
						color: 'black',
						justifyContent: 'left',
						alignItems: 'left',
						overflowWrap: 'break-word',
						maxWidth: '60vw',
						minWidth: '50vw',
						paddingBottom: '40px'
					}}>
						<b>Name</b>: {data.name}
						<br />
						<b>Bio</b>: {data.bio}
						<br />
					</Typography>
				</ListGroup.Item>
			</div>
			</div>
			<div id="usercalendar"><UserCalendar uid={userID} /></div>
			<Box>
				<Typography variant="h3" style={{ position: 'relative', top: '55px' }}>
					<div style={{paddingBottom: '20px'}}><b>Availability</b></div>
					
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