import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CardActions,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    TextField,
    useMediaQuery
} from '@mui/material';
import MainCard from '../components/MainCard';
import Transitions from '../components/Transations';
import NotificationList from './NotificationList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { tokens } from '../../theme';
import { useSelector } from 'react-redux';
import { userLoggedInAndHasNotification, userLoggedInAndNoNotification } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { getDatabase, ref, push, onValue } from "firebase/database";


// notification status options
const status = [
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'req',
        label: 'Request'
    }
];

const PopupNotification = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
        console.log(`current notification type = ${value} `)
    };

    const test_notifications = [{ name: "Admin", body: "This is a test notification" },

    { name: "Alex", body: "Your bread and butter is ready!" },

    { name: "Stephane", body: "School is almost over" }]

    const [notification, setNotifications] = useState([]);


    let eventsTemp = [];
    // grab notifications 
    useEffect(() => {
        // firebase things
        const db = getDatabase();
        const dataRef = ref(db, 'users/' + user.uid + '/notifications');
        if (dataRef == null) {
            dispatch(userLoggedInAndNoNotification);
        } else {
            dispatch(userLoggedInAndHasNotification);
        }
        if (user != null || user != undefined) {
            onValue(dataRef, (snapshot) => {
                snapshot.forEach(childSnapshot => {
                    let name = childSnapshot.val().name;
                    let from = childSnapshot.val().from;
                    let body = childSnapshot.val().body;
                    let type = childSnapshot.val().type;
                    let t = childSnapshot.val().time;

                    eventsTemp.push({ "from": from, "body": body, "name": name, "type": type, "id": snapshot.id, "time" : t });
                    console.log(`about to set notifications from=${from} body=${body}`)
                });
                setNotifications(eventsTemp);
                eventsTemp = [];
            });
        }
    }, []);

    const { user, hasNotification } = useSelector(
        (state) => state.user
    )
    console.log(`state of hasNotification = ${hasNotification}`)

    return (
        <>
            {/* actual notification btn  */}
            <Box
                sx={{
                    m: 1,
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleToggle}
                    sx={{ m: 2 }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                >

                    <Badge variant="dot" color="error" invisible={!hasNotification}>
                        <NotificationsActiveIcon />
                    </Badge>

                </IconButton>
            </Box >

            {/* the pop up notifcation  */}
            < Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }
                }
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container direction="column" spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box sx={{ px: 1, pt: 0.25, p: 1 }}>
                                                        <TextField
                                                            id="outlined-select-currency-native"
                                                            select
                                                            fullWidth
                                                            value={value}
                                                            onChange={handleChange}
                                                            SelectProps={{
                                                                native: true
                                                            }}
                                                        >
                                                            {status.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} p={0}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12} p={0} sx={{overflow: "auto", maxHeight: {xs: "350px", md: "500px"}, maxWidth: {xs: "80px"}}}>
                                                {notification.map(NotificationList)}
                                                </Grid>
                                            </Grid>
                                          
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" sx={{ color: colors.main[400] }} disableElevation component={Link} to="/notifications" onClick={handleClose}>
                                            View All
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper >
        </>
    );
};

export default PopupNotification;
