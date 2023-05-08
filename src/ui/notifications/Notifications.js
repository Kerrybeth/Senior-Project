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
import { IconBrandTelegram, IconBuildingStore, IconMailbox } from "@tabler/icons";
import User1 from "../../assets/images/person_icon.jpg";
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useEffect, useState } from 'react';


const ConditionalList = ({ name , body, time = "a few seconds ago", label = "new"}) => {
    const theme = useTheme();

    // const [delete, setDelete] = React.useState(false);

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

    return (<>
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt={name} src={User1} />
            </ListItemAvatar>
            <ListItemText primary={name}/>
            <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                        <Typography variant="caption" display="block" gutterBottom>
                            {time}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
            <Grid item xs={12} sx={{ p: 1}}>
                <Typography variant="subtitle2">{body}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 1}}>
                <Grid container>
                    <Grid item>
                        {label === "new" ? ( <Chip label="New" sx={chipWarningSX} />) : (<></>)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Divider />
    </>);

}

const Notifications = () => {
    let title = "CalendarBoard/Notifications";
    const theme = useTheme();
    const [notifcation, setNotifications] = useState([]);

    const test_notifications = [{name : "CalandarBoard", body: "This is a test notification"},

    {name: "Alex", body: "Your bread and butter is ready!"},

    {name: "Stephane", body: "School is almost over"}]
 
    const { user, error, sucess } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        const db = getDatabase();
        const dataRef = ref(db, 'users/' + user.uid + '/notifications');

        return onValue(dataRef, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists() && user !== null) {
                Object.values(data).map((notifications) => {
                    setNotifications((notifications) => [...notifications, notifications]);
                });
            }
        });
    }, []);

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
                <Typography variant="h5" sx={{ m: 2, position: "flex" }}>Here is a closer view of all your notifications</Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper', m: 1 }}>
                    {test_notifications.map(ConditionalList)}
                </List>
            </Box>
        </>
    );
}

export default Notifications; 