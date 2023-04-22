import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from "react-redux";
import { Box, Stack} from "@mui/material";

const User = () => {
	const { user, sucess } = useSelector(
		(state) => state.user
	)
	const [data, setData] = useState("");
	if (sucess) {/** we here */ }

	useEffect(() => {

		if (user !== null && user !== undefined) {
			const db = getDatabase();
			const dataRef = ref(db, 'users/' + user.uid + '/profile');

			onValue(dataRef, (snapshot) => {
				const data = snapshot.val() || '';
				setData(data);
			});
		}
	}, []);

	return (
		<Stack direction="row" spacing={2} justifyContent="space-between">
			<Box component='button' style={{ minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px' }}>
				<Image src="logo.svg" roundedCircle />
			</Box>
			<Box>
				<Typography variant="h3" style={{
					color: 'black',
					justifyContent: 'left',
					alignItems: 'left',
					m: 1,
					p: 1
				}}>

					Name: {data.name}
					<br />
					<br />
					Bio: {data.bio}
					<br />
					<br />
				</Typography>

				<Link to="/UserEdit">
					<Button variant="contained" sx={{ maxHeight: '50px', }}>
						<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
							Edit
						</Typography>
					</Button>
				</Link>
			</Box>
		</Stack>

	);
}
export default User; 