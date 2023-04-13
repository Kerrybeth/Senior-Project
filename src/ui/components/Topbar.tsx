import { AppBar, Toolbar, Typography } from "@mui/material";
import { sizeConfigs } from "./configs";
import { colorConfigs } from "./configs";
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
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
import { useUserAuth } from "../auth/UserAuthContext";
import PopupNotification from "../notifications/PopupNotification";
import { useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../../theme";
import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import '../../App.css';

const drawerWidth = 240;
const navItems = ['Home', 'Settings', 'Log out'];

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
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
      <div className="pageLightLeft">
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
            sx={{ color: "black", ml: "5px" }}
          >
            Welcome {user && user.email}!
          </Typography>
        </Typography>

        {/* home, logout, icons */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: 'black' }}>
          <Button component={Link} to="/" sx={{ color: 'black' }}>
            Home
          </Button>
          <Button component={Link} to="/login" sx={{ color: 'white' }} onClick={handleLogout}>
            Logout
          </Button>
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
      </div>

    </AppBar>
  );
};

export default Topbar;