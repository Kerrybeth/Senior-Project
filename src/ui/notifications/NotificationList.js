import { useTheme, styled } from '@mui/material/styles';
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

export const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 1,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const NotificationList = ({ from = "Uknown Sender", body = "", time = "a few seconds ago", type = "new" }) => {
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

    return (
        <List
            sx={{
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '75%',
                py: 0,
                borderRadius: '10px',
                '& .MuiListItemSecondaryAction-root': {
                    top: 2
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 2
                },
                display: 'flow',
            }}
        >
            <ListItemWrapper>
                <ListItem alignItems="center">

                    <Grid container direction="row">
                        <Grid container direction={"column"} alignContent={"space-between"}>
                            <Grid item xs={6} m={1} >
                                <Typography variant="caption" alignSelf={"left"} gutterBottom>
                                    {/* {from.length <= 10 ? from : `${from.substring(0, 10)}... `} */}
                                    {from}
                                </Typography>
                            </Grid>

                            <Grid item xs={6} m={1} >
                                <Typography variant="caption" alignSelf={"right"} gutterBottom>
                                    {time}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className="list-container">
                            <Grid item xs={12} sx={{ p: 0.5 }}>
                                <Typography variant="subtitle2">{body}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ p: 1 }}>
                                <Grid container>
                                    <Grid item>
                                        {
                                            {
                                                'new': <Chip label="New" sx={chipWarningSX} />,
                                                'req': <Chip label="Req" sx={chipErrorSX} />,
                                                'sys': <Chip label="Sys" sx={chipSX} />,
                                                'eventreq': <Chip label="Event Request" sx={chipSX} />,
                                                'groupinv': <Chip label="Group Request" sx={chipSX} />
                                                
                                            }[type]
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>

                <Divider />
            </ListItemWrapper>
        </List>
    );
};

export default NotificationList;
