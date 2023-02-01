import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

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
        </Box>
    );
}

export default Events; 