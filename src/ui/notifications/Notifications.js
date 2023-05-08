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
import NotificationList from "./NotificationList";

const Notifications = () => {
    let title = "CalendarBoard/Notifications";
    const theme = useTheme();
    const [notifcation, setNotifications] = useState({});

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
              setNotifications(data);
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
                    {test_notifications.map(NotificationList)}
                </List>
            </Box>
        </>
    );
}

export default Notifications; 