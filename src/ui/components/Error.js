import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";

const Error = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '30vh',
            }}
        >
            <Typography variant="h1" style={{ color: 'red', margin: "20px" }}>
                I am error, you're not supposed to be here!!
            </Typography>
            
        </Box>
    );
}

export default Error; 