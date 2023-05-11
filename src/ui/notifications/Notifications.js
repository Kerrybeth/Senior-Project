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
import { onSnapshot, query } from "firebase/firestore";
import { userLoggedInAndHasNotification, userLoggedInAndNoNotification } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Notifications = () => {
    let title = "CalendarBoard/Notifications";
    const theme = useTheme();
    const [notification, setNotifications] = useState([]);
    const dispatch = useDispatch();


    const test_notifications = [{ name: "CalandarBoard", body: "This is a test notification" },

    { name: "Alex", body: "Your bread and butter is ready!" },

    { name: "Stephane", body: "School is almost over" }]

    const { user, error, sucess } = useSelector(
        (state) => state.user
    )

    let eventsTemp = [];
    // grab notifications 
    useEffect(() => {

        // firebase things
        const db = getDatabase();
        const dataRef = ref(db, 'users/' + user.uid + '/notifications');
        if (user != null || user != undefined) {
            onValue(dataRef, (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    let name = childSnapshot.val().name;
                    let from = childSnapshot.val().from;
                    let body = childSnapshot.val().body;
                    let type = childSnapshot.val().type;
                    let t = true; 

                    eventsTemp.push({ "from": from, "body": body, "name": name, "type": type, "id": snapshot.id});
                    console.log(`about to set notifications from=${from} body=${body}`)
                });
                setNotifications(eventsTemp);
                eventsTemp = [];
            });
        }

        if(notification.length == 0 ){
            dispatch(userLoggedInAndNoNotification);
        }else{
            dispatch(userLoggedInAndHasNotification);
        }
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
                   
                }}
            >
                <Typography variant="h5" sx={{ m: 2, position: "flex", textAlign: "center"}}>Here is a closer view of all your notifications</Typography>

                <List sx={{ bgcolor: 'background.paper', m: 1 }}>
                    {notification.map(data => NotificationList(data))}
                </List>
            </Box>
        </>
    );
}

export default Notifications; 