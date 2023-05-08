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

const NotificationList = ({ name, body, time = "a few seconds ago", label = "new" }) => {
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
                maxWidth: 330,
                maxHeight: 'calc(90vh - 205px)',
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                },
                display: 'flow',
                overflow: 'auto'
            }}
        >
            <ListItemWrapper>
                {/* one notification card */}
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt={name} src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={name} />
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
                    <Grid item xs={12} sx={{ p: 1 }}>
                        <Typography variant="subtitle2">{body}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1 }}>
                        <Grid container>
                            <Grid item>
                                {label === "new" ? (<Chip label="New" sx={chipWarningSX} />) : (<></>)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </ListItemWrapper>
        </List>
    );
};

export default NotificationList;
