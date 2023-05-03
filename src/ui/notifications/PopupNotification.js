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

// notification status options
const status = [
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const PopupNotification = () => {
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
    };

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

                    <Badge badgeContent={1} color="error">
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
                                                    <Box sx={{ px: 2, pt: 0.25, p: 2 }}>
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
                                                    <Divider sx={{ my: 0 }} />
                                                </Grid>
                                            </Grid>
                                            <NotificationList />
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" sx={{color : colors.main[400]}} disableElevation component={Link} to="/notifications" onClick={handleClose}>
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
