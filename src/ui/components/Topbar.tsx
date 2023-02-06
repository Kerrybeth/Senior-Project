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
const drawerWidth = 240;
const navItems = ['Home', 'Settings', 'Log out'];

const Topbar = () => {



  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
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
          CalandarBoard
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "green", ml: "5px"}}
          >
            Welcome Stephane!
          </Typography>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: 'black' }}>
          <Button component={Link} to="/" sx={{ color: 'black' }}>
            Home
          </Button>
          <Button component={Link} to="/login" sx={{ color: 'red' }}>
            Logout
          </Button>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ m: 2 }}
          >
            <NotificationsActiveIcon />
          </IconButton>
        </Box>



      </Toolbar>
    </AppBar>
  );
};

export default Topbar;