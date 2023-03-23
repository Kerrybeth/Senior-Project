import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../auth/UserAuthContext";

const Events = () => {

    const { user } = useUserAuth();
    const navigate = useNavigate();
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        navigate("/login")
      }
    });

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
			<Link to="/CreateGroupEvents">
				<Button variant="contained" sx={{ maxHeight: '50px', }}>
					<Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
						Create Group Event
					</Typography>
				</Button>
			</Link>
        </Box>
    );
}

export default Events; 