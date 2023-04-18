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
import UpdateUser from "../../updateUser/UpdateUser";
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

// const appRoutes1: RouteType[] = [
//     {
//         index: true,
//         element: <HomePage />,
//         state: "home"
//     },
//     {
//         path: "/installation",
//         element: <InstallationPage />,
//         state: "installation",
//         sidebarProps: {
//             displayText: "Installation",
//             icon: <FileDownloadOutlinedIcon />
//         }
//     },
//     {
//         path: "/dashboard",
//         element: <DashboardPageLayout />,
//         state: "dashboard",
//         sidebarProps: {
//             displayText: "Dashboard",
//             icon: <DashboardOutlinedIcon />
//         },
//         child: [
//             {
//                 index: true,
//                 element: <DashboardIndex />,
//                 state: "dashboard.index"
//             },
//             {
//                 path: "/dashboard/default",
//                 element: <DefaultPage />,
//                 state: "dashboard.default",
//                 sidebarProps: {
//                     displayText: "Default"
//                 },
//             },
//             {
//                 path: "/dashboard/analytics",
//                 element: <AnalyticsPage />,
//                 state: "dashboard.analytics",
//                 sidebarProps: {
//                     displayText: "Analytic"
//                 }
//             },
//             {
//                 path: "/dashboard/saas",
//                 element: <SaasPage />,
//                 state: "dashboard.saas",
//                 sidebarProps: {
//                     displayText: "Saas"
//                 }
//             }
//         ]
//     },
//     {
//         path: "/component",
//         element: <ComponentPageLayout />,
//         state: "component",
//         sidebarProps: {
//             displayText: "Components",
//             icon: <AppsOutlinedIcon />
//         },
//         child: [
//             {
//                 path: "/component/alert",
//                 element: <AlertPage />,
//                 state: "component.alert",
//                 sidebarProps: {
//                     displayText: "Alert"
//                 },
//             },
//             {
//                 path: "/component/button",
//                 element: <ButtonPage />,
//                 state: "component.button",
//                 sidebarProps: {
//                     displayText: "Button"
//                 }
//             }
//         ]
//     },
//     {
//         path: "/documentation",
//         element: <DocumentationPage />,
//         state: "documentation",
//         sidebarProps: {
//             displayText: "Documentation",
//             icon: <ArticleOutlinedIcon />
//         }
//     },
//     {
//         path: "/changelog",
//         element: <ChangelogPage />,
//         state: "changelog",
//         sidebarProps: {
//             displayText: "Changelog",
//             icon: <FormatListBulletedOutlinedIcon />
//         }
//     }
// ];

export default appRoutes;