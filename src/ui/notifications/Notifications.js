import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const Notifications = () => {
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
                I am Notifications :)
            </Typography>
        </Box>
    );
}

export default Notifications; 