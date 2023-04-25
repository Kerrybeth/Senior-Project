import { AppBar, Toolbar, Typography } from "@mui/material";
import { sizeConfigs } from "./configs";
import { colorConfigs } from "./configs";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from "@mui/icons-material/Settings";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from "react-router-dom";
import PopupNotification from "../notifications/PopupNotification";
import { useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../../theme";
import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Cookies from "universal-cookie";
import { guestUserLoggedin, userLoggedOut } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import { logOut } from "../../firebase";
import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "../../redux/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { guestUserLoggedOut } from "../../redux/userSlice";

const Topbar = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // const {uid, email} = useSelector((state: RootState) => state.user.value);

  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

  const { user, error, sucess, guest } = useSelector(
    (state: any) => state.user
  )

  const handleLogout = async () => {
    if (guest) {
      dispatch(guestUserLoggedOut());
      navigate("/");
    } else {
      try {
        await logOut();
        dispatch(userLoggedOut());
        navigate("/");
      } catch (error) {
        console.log("could not logout : " + error);
      }
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        height: '80px',
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colors.main[100],
        color: colorConfigs.topbar.color
      }}

    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          CalendarBoard
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "green", ml: "5px" }}
          >
            {(guest == false || guest == undefined) ? (<>Welcome {user && user.email}!</>) : (<>Welcome guest! Login for full acess.</>)}

          </Typography>
        </Typography>

        {/* home, logout, icons */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: 'black' }}>
          <Button component={Link} to="/" sx={{ color: 'black' }}>
            Home
          </Button>
          {sucess == true ? (<Button sx={{ color: 'red' }} onClick={handleLogout}>
            Logout
          </Button>) : (<Button sx={{ color: 'green' }} onClick={handleLogout}>
            Login
          </Button>)}

          <PopupNotification />

          <IconButton onClick={colorMode.toggleColorMode} >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon sx={{ color: colors.yellow }} />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default Topbar;