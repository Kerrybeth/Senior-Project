import { Box } from "@mui/system";
import { Helmet } from 'react-helmet';
import { ListItemWrapper } from "./NotificationList";
import {
    Avatar,
    Button,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from "@tabler/icons";
import User1 from "../../assets/images/person_icon.jpg";
import { useTheme } from '@mui/material/styles';


const OneItem = () => {
    return (
        <>
            <Box></Box>
        </>
    );

}

const Notifications = () => {
    let title = "CalandarBoard";
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: "#996E8A",
        backgroundColor: "#F9C32D",
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box
                sx={{
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                    width: '100%',
                }}
            >
                <Typography variant="h5" sx={{ p: 0.5, position: "flex" }}>Here is a closer view of all your notifications</Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper', m: 2 }}>
                    <ListItemWrapper>
                        {/* one notification card */}
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar alt="John Doe" src={User1} />
                            </ListItemAvatar>
                            <ListItemText primary="John Doe" />
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            2 min ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Chip label="Unread" sx={chipErrorSX} />
                                    </Grid>
                                    <Grid item>
                                        <Chip label="New" sx={chipWarningSX} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                    <Divider />

                    {/* another notification card */}
                    <ListItemWrapper>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: theme.palette.success.dark,
                                        backgroundColor: theme.palette.success.light,
                                        border: 'none',
                                        borderColor: theme.palette.success.main
                                    }}
                                >
                                    <IconBuildingStore stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            2 min ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">We have successfully received your request.</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Chip label="Unread" sx={chipErrorSX} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>

                    <Divider />
                    <ListItemWrapper>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: theme.palette.primary.dark,
                                        backgroundColor: theme.palette.primary.light,
                                        border: 'none',
                                        borderColor: theme.palette.primary.main
                                    }}
                                >
                                    <IconMailbox stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            2 min ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                                            Mail
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                    <Divider />

                </List>
            </Box>
        </>
    );
}

export default Notifications; 