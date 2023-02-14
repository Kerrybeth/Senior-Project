import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const Contacts = () => {
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
             I am contacts 
            </Typography>
        </Box>
    );
}

export default Contacts; 