import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Button, Stack, Paper } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/material/styles";


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
            <Typography variant="h1" style={{ color: 'red', margin: "20px" }}>
            
            </Typography>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Item>  <Button variant="outlined" sx={{ backgroundColor: "#fff", width: "fit-content", textAlign: "center" }} >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    <a href={"/"}>Back Home</a>
                </Button></Item>
                <Item> <Button variant="outlined" sx={{ backgroundColor: "", width: "fit-content", textAlign: "center" }} >
                    Logout
                </Button></Item>
            </Stack>
        </Box>
    );
}

export default Error; 