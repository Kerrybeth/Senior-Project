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
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '30vh',
            }}

        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '30vh',
                    position: "fixed",

                }}

            >
                <Typography variant="h1" style={{ color: 'red', margin: "20px", position: "absolute" }}>
                    !!404!! 
                </Typography>
            </Box>

            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{marginTop: "150px"}}
            >
                <Button component={Link} to="/" variant="outlined" sx={{ width: "fit-content", textAlign: "center" }} >
                    <HomeIcon sx={{ mr: "10px" }} /> Go Home
                </Button>

                <Button component={Link} to="/signup" variant="outlined" sx={{width: "fit-content", textAlign: "center" }} >
                    Logout
                </Button>
            </Stack>
        </Box>
    );
}

export default Error; 