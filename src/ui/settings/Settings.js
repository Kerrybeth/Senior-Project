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
            <br/>
            <Typography variant="h2" style={{ color: 'black' }}> Schedule Privacy </Typography>
            <br/>
                <button> Friends </button> 
                <button> Group Members</button>
                <br/>
                <button> All Users </button>
                <button> Nobody </button>
                <br/>
            <Typography variant="h2" style={{ color: 'black' }}> Theme </Typography>
            <br/>
                <button> Light </button>
                <button> Dark </button>
                <br/>
            <Typography variant="h2" style={{ color: 'black' }}> Account Settings </Typography>
            <br/>
                <button> Change Username </button>
                <button> Change Password </button>
                <button> Delete Account </button>

        </Box>
    );
}

export default Settings; 