import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './ui/login/Login';
import Home from "./ui/home/Home";
import Error from "./ui/components/Error";
import User from "./ui/user/User";
import Groups from "./ui/groups/Groups";
import Events from "./ui/events/Events";
import Contacts from "./ui/contacts/Contacts";
import Settings from "./ui/settings/Settings";
import Notifications from "./ui/notifications/Notifications";
import UserEdit from "./ui/user/UserEdit";
import CreateGroup from "./ui/groups/CreateGroup";
import CreateEvents from "./ui/events/CreateEvents";
import CreateGroupEvents from "./ui/events/CreateGroupEvents";
import { ThemeProvider } from '@mui/material/styles';
import { tokens } from "./theme";
import { ColorModeContext, useMode } from "./theme"
import { Box, Toolbar } from "@mui/material";
import { sizeConfigs } from "./ui/components/configs";
import Sidebar from "./ui/components/Sidebar";
import Topbar from "./ui/components/Topbar";
import { Helmet } from 'react-helmet';
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Signup from "./ui/login/Signup";
import { getAuth, browserLocalPersistence, setPersistence, browserSessionPersistence } from 'firebase/auth'

function App() {
  const cookies = new Cookies();

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const title = "CalendarBoard";

  const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

  const { user, error, sucess, guest, rememberMe } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser !== undefined && currentuser !== null) {
        console.log("Auth", currentuser, currentuser.uid);
        localStorage.setItem('userToken', currentuser.uid)
        auth.setPersistence(rememberMe == true ? browserLocalPersistence : browserSessionPersistence)
      } else {
        localStorage.setItem('userToken', '')
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkForInvalidUser = user == undefined || user == null || user == '' || guest == undefined || guest == false;
  if (checkForInvalidUser) {
    return (
      <Login />
    );
  }

  return (
    <>
      <Helmet>
        <title>{title + "/home"}</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <Topbar />
            <Box
              component="nav"
              sx={{
                width: sizeConfigs.sidebar.width,
                flexShrink: 0
              }}
            >
              <Sidebar />
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 1,
                width: `calc(100% - ${sizeConfigs.sidebar.width})`,
                minHeight: "100vh",
                backgroundColor: colors.main[100]
              }}
            >
              <Toolbar />

              <Routes>
                <Route path="/" element={<Home />}>
                </Route>
                <Route path="/user" element={<User />} />
                <Route path="/useredit" element={<UserEdit />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/creategroup" element={<CreateGroup />} />
                <Route path="/events" element={<Events />} />
                <Route path="/createevents" element={<CreateEvents />} />
                <Route path="/creategroupevents" element={<CreateGroupEvents />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default App;
