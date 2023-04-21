import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./ui/home/Home";
import Error from "./ui/components/Error";
import User from "./ui/user/User";
import Groups from "./ui/groups/Groups";
import Events from "./ui/events/Events";
import Contacts from "./ui/contacts/Contacts";
import Settings from "./ui/settings/Settings";
import UpdateUser from "./updateUser/UpdateUser";
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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import Reset from "./ui/components/Reset";
import { Outlet } from "react-router-dom";
import Login from "./ui/login/Login";
import Signup from "./ui/login/Signup";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./redux/userSlice";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const dispatch = useDispatch();

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const title = "CalendarBoard";

  const { sucess, rememberMe } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser !== undefined && currentuser !== null) {
        // if (process.env.NODE_ENV === 'development') {
        //   connectAuthEmulator(auth, "http://localhost:9099");
        // }
        console.log("Auth", currentuser, currentuser.uid);
        if (rememberMe) {
          localStorage.setItem('userToken', currentuser.uid);
          dispatch(userLoggedIn(currentuser));
        } else {
          localStorage.setItem('userToken', '')
        }
      } else {
        console.log(`current user is null : ${currentuser}`);
      }
    });

    return () => {
      unsubscribe();
    };
  },);

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
            {sucess === true ? (<Topbar />) : (<></>)}
            <Box
              component="nav"
              sx={{
                width: sucess === true ? sizeConfigs.sidebar.width : 0,
                flexShrink: 0
              }}
            >
              {sucess === true ? (<Sidebar />) : (<></>)}
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
                <Route path="*" element={<Error />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute isAllowed={sucess} />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/useredit" element={<UserEdit />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/creategroup" element={<CreateGroup />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/createevents" element={<CreateEvents />} />
                  <Route path="/creategroupevents" element={<CreateGroupEvents />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/updateUser" element={<UpdateUser />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default App;
