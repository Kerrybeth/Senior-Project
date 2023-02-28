import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import Button from '@mui/material/Button';
import { lightTheme } from '../../theme';
import { useTheme } from '@mui/material/styles';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/Listgroup';
import Button from '@mui/material/Button';

const User = () => {
	return (
	const theme = useTheme();
	return (
		<div>
			<Box component='button' style={{ minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px' }}>
				<Image src="logo.svg" roundedCircle />
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
						Name:
						<br />
						<br />
						Bio:
						<br />
						<br />
						Description:
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
						Name:
						<br />
						<br />
						Bio:
						<br />
						<br />
						Description:
						<br />
					</Typography>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/UserEdit">
						<Button variant="contained" theme="theme.palette.primary.main" sx={{ maxHeight: '50px', }}>
							<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
								Edit
							</Typography>
						</Button>
					</Link>
				</ListGroup.Item>
			</ListGroup>
			<Box>
				<Typography variant="h1" style={{ position: 'relative', top: '200px' }}>
					Availability
				<Typography variant="h1" style={{ position: 'relative', top: '200px' }}>
					Availability
				</Typography>
			</Box>
		</div>
	);
	);
}

const test = () => {

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '30vh',
			}}

		>
			<Typography variant="3" sx={{ m: 3, color: "green" }}> Hi, I am the current replacement for user.</Typography>
		</Box>
	)
}

const test = () => {

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '30vh',
			}}

		>
			<Typography variant="3" sx={{ m: 3, color: "green" }}> Hi, I am the current replacement for user.</Typography>
		</Box>
	)
}

const test = () => {

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '30vh',
			}}

		>
			<Typography variant="3" sx={{ m: 3, color: "green" }}> Hi, I am the current replacement for user.</Typography>
		</Box>
	)
}

export default test; 