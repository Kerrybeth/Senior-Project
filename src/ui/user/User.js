import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { getAuth, currentUser } from "firebase/auth";
import { getDatabase, ref, set, update, push, onValue } from "firebase/database";
import { useEffect, useContext, useState } from 'react';
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';

const User = () => {

	const user = useContext(userAuthContext);
	const [namey, setNamey] = useState("");
	const [bio, setBio] = useState("");

    useEffect(() => {

        const db = getDatabase();  
        const dataRef = ref(db, 'users/' + user.user.uid + '/profile');

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                setNamey(childSnapshot.val().name);
                setBio(childSnapshot.val().bio);
            });
        });
    });
	
    return (
		<div>
			<Box component='button' style={{minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px'}}>
				<image>
				User Pic
				</image>
			</Box>
			<Box
				sx={{
					display: 'flex',
					minHeight: '100px',
					maxWidth: '1000px',
					border: 'solid',
					position: 'fixed', 
					top: '100px', 
					right: '100px'
				}}
			>
				<Typography variant="h3" style={{ 
					color: 'black', 
					justifyContent: 'left', 
					alignItems: 'left'
				}}>
				Name: {namey + "gg"}
				<br/>
				<br/>
				Bio: {bio}
				<br/>
				<br/>
				</Typography>
				<Link to= "/useredit">
					<button style={{maxHeight:'50px',}}>
						<Typography variant ="h4" style={{ color: 'black', justifyContent: 'right', alignItems: 'right'}}>
						Edit
						</Typography>
					</button>
				</Link>
			</Box>
			<Box>
				<Typography variant ="h1" style={{ color: 'black', position: 'relative', top: '200px'}}>
				Availability
				</Typography>
			</Box>
		</div>
    );
}

export default User; 