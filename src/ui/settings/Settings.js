import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const Settings = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                minHeight: '30vh',
            }}
        >
            <Typography variant="h1" style={{ color: 'black' }}> Settings </Typography>
            <Typography variant="h2" style={{ color: 'black' }}> Schedule Privacy </Typography>
                <button> Friends </button> 
                <button> Group Members</button>
                <button> All Users </button>
                <button> Nobody </button>
            <Typography variant="h2" style={{ color: 'black' }}> Theme </Typography>
                <button> Light </button>
                <button> Dark </button>
            <Typography variant="h2" style={{ color: 'black' }}> Account Settings </Typography>
                <button> Change Username </button>
                <button> Change Password </button>
                <button> Delete Account </button>

        </Box>
    );
}

export default Settings; 