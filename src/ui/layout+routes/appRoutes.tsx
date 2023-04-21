import { RouteType } from "../components/configs";
import User from "../user/User";
import UserEdit from "../user/UserEdit";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Settings from "../settings/Settings";
import Contacts from "../contacts/Contacts";
import Events from "../events/Events";
import CreateEvents from "../events/CreateEvents";
import CreateGroupEvents from "../events/CreateGroupEvents";
import Groups from "../groups/Groups";
import CreateGroup from "../groups/CreateGroup";
import Home from "../home/Home";
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SettingsIcon from '@mui/icons-material/Settings';

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <Home />,
        state: "home"
    }, {
        path: "/user",
        element: <User />,
        state: "user",
        sidebarProps: {
            displayText: "User",
            icon: <AccountBoxIcon />
		}
    }, {
        path: "/useredit",
        element: <UserEdit />,
        state: "useredit"
    }, {
        path: "/groups",
        element: <Groups />,
        state: "groups",
        sidebarProps: {
            displayText: "Groups",
            icon: <Diversity1Icon />
        }
    }, {
		path: "/creategroup",
		element: <CreateGroup />,
		state: "creategroup"
	}, {
        path: "/events",
        element: <Events />,
        state: "events",
        sidebarProps: {
            displayText: "Events",
            icon: <EventAvailableIcon />
        }
    }, {
		path: "/createevents",
		element: <CreateEvents />,
		state: "createevents"
	}, {
		path: "/creategroupevents",
		element: <CreateGroupEvents />,
		state: "creategroupevents"
	},{
        path: "/contacts",
        element: <Contacts />,
        state: "contacts",
        sidebarProps: {
            displayText: "Contacts",
            icon: <GroupIcon />
        }
    }, {
        path: "/settings",
        element: <Settings />,
        state: "settings",
        sidebarProps: {
            displayText: "Settings",
            icon: <SettingsIcon />
        }
        
    },
];

export default appRoutes;