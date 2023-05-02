import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import { colorConfigs } from "./configs";
import { sizeConfigs } from "./configs";
import appRoutes from "../layout+routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { tokens } from "../../theme";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user, guest } = useSelector(
    (state: any) => state.user
  )

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;

  const ligtht_colors = tokens('light');
  const dark_clolors = tokens('dark');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    window.open('https://github.com/anxelic/Senior-Project/tree/main', '_blank');
    setOpen(false);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: theme.palette.mode === 'dark' ? "#323639" : "#667798",
          color: colorConfigs.sidebar.color,
        },
        pointerEvents: guest == true ? "none" : "unset"
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar src={assets.images.logo} />
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>

      {/* copy right + about us  */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"About"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This web app was made with a smile by Logan, David, Stephane, Kerrybeth, and Chris. Please report
            any issues, and we hope it provided some value to you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{}} onClick={handleClose2}>Source code</Button>
          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Typography onClick={handleClickOpen} variant="caption" display="block" gutterBottom sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} >
        CalendarBoard Beta v1.0.0
      </Typography>
    </Drawer>
  );
};

export default Sidebar;