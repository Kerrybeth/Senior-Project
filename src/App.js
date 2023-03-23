import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./ui/layout+routes/Routes"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './ui/login/login';
import Signup from './ui/login/signup';
import Home from "./ui/home/Home";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider, useUserAuth } from './ui/auth/UserAuthContext';
import Error from "./ui/components/Error";
import User from "./ui/user/User";
import Groups from "./ui/groups/Groups";
import Events from "./ui/events/Events";
import Contacts from "./ui/contacts/Contacts";
import Settings from "./ui/settings/Settings";
import Calendar from '../src/ui/components/calendar.js'
import Notifications from "./ui/notifications/Notifications";
import PopupNotification from "./ui/notifications/PopupNotification";
import UserEdit from "./ui/user/UserEdit";
import CreateGroup from "./ui/groups/CreateGroup";
import CreateEvents from "./ui/events/CreateEvents";
import CreateGroupEvents from "./ui/events/CreateGroupEvents";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { tokens } from "./theme";
import { ColorModeContext, useMode } from "./theme"
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { colorConfigs } from "./ui/components/configs";
import { sizeConfigs } from "./ui/components/configs";
import Sidebar from "./ui/components/Sidebar";
import Topbar from "./ui/components/Topbar";
import { Helmet } from 'react-helmet';
import { useState } from "react";
import Cookies from "universal-cookie";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const cookies = new Cookies();

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  setIsAuth("true");

  const { user } = useUserAuth();
  const title = "CalendarBoard"

  const TodoDone = () => {


  }

  return (
    <>
      <ErrorBoundary fallback={<div>Something really went wrong</div>}>
        <Helmet>
          <title>{title + "/home"}</title>
          <meta name="description" content="App Description" />
          <meta name="theme-color" content="#008f68" />
        </Helmet>
        <UserAuthContextProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
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

                    {isAuth ? (
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
                      </Routes>) :
                      (<Login />)}

                  </Box>
                </Box>
              </BrowserRouter>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </UserAuthContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
