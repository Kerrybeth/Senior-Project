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


const ConditionalList = ({ time = "a few seconds ago", body = "this is a notification" }) => {
    const theme = useTheme();

    const notifications = [
        ["2 mins ago", "This is a test notification"],

        ["3 mins ago", "Your bread and butter is ready!"],

        ["1hr ago", "School is almost over"],
    ];

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
            <ListItemWrapper>
                {/* one notification card */}
              {notifications.map((item, index) => {

                return (<>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    {item[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">{item[1]}</Typography>
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
                <Divider />
                </>)

              })}
            </ListItemWrapper>
        </>
    );

}

const Notifications = () => {
    let title = "CalendarBoard/Notifications";
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
                 
                </List>
            </Box>
        </>
    );
}

export default Notifications; 