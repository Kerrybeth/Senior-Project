import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Button, Stack, Paper } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom'


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
            <Typography variant="h1" style={{ color: 'red', margin: "20px", position: "absolute" }}>
            Error
            </Typography>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Button  component={Link} to="/"  variant="outlined" sx={{ backgroundColor: "", width: "fit-content", textAlign: "center" }} >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                </Button>

                <Button  component={Link} to="/" variant="outlined" sx={{ backgroundColor: "", width: "fit-content", textAlign: "center" }} >
                    Logout
                </Button>
            </Stack>
        </Box>
    );
}

export default Error; 