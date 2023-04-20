import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Button, Stack, Paper } from "@mui/material";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 50,
    width: 120,
    lineHeight: '60px',
}));

const Error = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '30vh',
            }}

        >
            <Typography variant="h1" style={{ color: 'red', margin: "20px" }}>
                404, CalandarBoard broke down :(
            </Typography>

            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{}}
            >
                <Button component={Link} to="/" variant="contained" sx={{ width: "fit-content", textAlign: "center" }} >
                    <HomeIcon sx={{ mr: "10px" }} /> Go Home
                </Button>

                <Button component={Link} to="/login" variant="contained" sx={{ width: "fit-content", textAlign: "center" }} >
                    Logout
                </Button>
            </Stack>
        </Box>
    );
}

export default Error; 