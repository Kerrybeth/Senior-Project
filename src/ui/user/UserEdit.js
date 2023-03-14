import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { getDatabase, ref, set, update, push } from "firebase/database";
import { getAuth, currentUser } from 'firebase/auth';
import { useState } from "react";

const UserEdit = () => {

	const [namey, setNamey] = useState('');
	const [bio, setBio] = useState('');

	function handleSubmit (event) {
		console.log("test")
		event.preventDefault();
		
		const user = getAuth().currentUser;  
        const db = getDatabase();   
        set(ref(db, 'users/' + user.uid + '/profile'), {
            name: namey,
            bio: bio
        });

		setNamey('');
		setBio('');
	};

	// const handleChangeBio = (event) => {
	// 	bio = event.target.value;
	// };

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
					<form onSubmit={handleSubmit}>
						<label>
							Name:
							<input type="text" value={namey} onChange={(event) => setNamey(event.target.value)}></input> 
							<br></br>
						</label>
						<label>
							Bio:
							<input type="text" value={bio} onChange={(event) => setBio(event.target.value)}></input> 
							<br></br>
						</label>
						<br></br>
						<button type="submit">Submit</button>
					</form>				
				</Typography>
				<Link to= "/User">
					<button style={{maxHeight:'50px',}}>
						<Typography variant ="h4" style={{ color: 'black', justifyContent: 'right', alignItems: 'right'}}>
						Back
						</Typography>
					</button>
				</Link>
			</Box>
			<Box>
				{/* <Typography variant ="h1" style={{ color: 'black', position: 'relative', top: '200px'}}>
				Availability
				</Typography> */}
			</Box>
		</div>
    );
}

export default UserEdit; 