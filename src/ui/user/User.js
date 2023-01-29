import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const User = () => {
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
               I am user :) 
            </Typography>
        </Box>
    );
}

export default User; 