import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Events = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '30vh',
            }}
        >
            <Typography variant="h1" style={{ color: 'black' }}>
             I am Events
            </Typography>
			<Link to="/CreateEvents">
				<Button variant="contained" sx={{ maxHeight: '50px', }}>
					<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
						Create Event
					</Typography>
				</Button>
			</Link>
        </Box>
    );
}

export default Events; 