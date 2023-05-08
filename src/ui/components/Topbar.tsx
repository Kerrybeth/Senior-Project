import { AppBar, Toolbar, Typography } from "@mui/material";
import { sizeConfigs } from "./configs";
import { colorConfigs } from "./configs";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PopupNotification from "../notifications/PopupNotification";
import { useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../../theme.js";
import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { userLoggedOut } from "../../redux/userSlice";
import { logOut } from "../../firebase";
import { useDispatch, useSelector } from 'react-redux'
import { guestUserLoggedOut } from "../../redux/userSlice";
import '../../App.css';
import { useMediaQuery } from "@mui/material";

const Topbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const { user, sucess, guest } = useSelector(
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
  if (mobileOpen) { /**we can open mobile!**/ }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };




  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        width: matchesXs ? `calc(100% - ${sizeConfigs.sidebar.width})` : `100%`,
        height: '80px',
        ml: sizeConfigs.sidebar.width,
        marginBottom: 3,
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
           sx={{ flexGrow: 1, display: "block"}}
          >
            CalendarBoard
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "black", m: "1px" }}
              width={"fit-content"}
            >
              {(guest == false || guest == undefined) ? (<>Welcome {user && user.email}!</>) : (<>Welcome guest! Login for full acess.</>)}

            </Typography>
          </Typography>

          {/* home, logout, icons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: 'black' }}>
            <Button component={Link} to="/" sx={{ color: 'black' }}>
              Home
            </Button>
            {sucess === true ? (<Button sx={{ color: 'red' }} onClick={handleLogout}>
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
      </div>
    </AppBar >
  );
};

export default Topbar;