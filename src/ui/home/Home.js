import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';

const Home = () => {
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
                !!404!! You are not supposed to be lurking here...
            </Typography>
        </Box>
    );
}

export default Home; 