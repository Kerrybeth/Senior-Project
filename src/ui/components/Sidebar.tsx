import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import { colorConfigs } from "./configs";
import { sizeConfigs } from "./configs";
import appRoutes from "../layout+routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useSelector } from "react-redux";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { tokens } from "../../theme";

function AuthorsList({ handleDavidClick }: any, { handleStephaneClick }: any, { handleKerryBethClick }: any, { handleChrisClick }: any, { handleLoganClick }: any) {
  return (
    <List sx={{ width: '100%', p: 1, m: 1 }}>
      {/* first card */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary="Chris - "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
            </React.Fragment>

          }
        />

        <IconButton onClick={handleChrisClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={() => true}>
          <LinkedInIcon />
        </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      {/* another card */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary="David - "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
            </React.Fragment>

          }
        />
        <IconButton onClick={handleDavidClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={() => true}>
          <LinkedInIcon />
        </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary="Logan - "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
            </React.Fragment>

          }
        />
        <IconButton onClick={handleLoganClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={() => true}>
          <LinkedInIcon />
        </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary="KarryBeth - "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
            </React.Fragment>

          }
        />
        <IconButton onClick={handleKerryBethClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={() => true}>
          <LinkedInIcon />
        </IconButton>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary="Stephane Katende - Software Engineer"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I like doing a lot of things, given I have the energy :)
              </Typography>
            </React.Fragment>

          }
        />
        <IconButton onClick={handleStephaneClick}>
          <GitHubIcon />
        </IconButton>
        <IconButton onClick={() => true}>
          <LinkedInIcon />
        </IconButton>
      </ListItem>

    </List>
  );
}

const Sidebar = () => {
  const { user, guest } = useSelector(
    (state: any) => state.user
  )

  if (user) {
    //we got a user!
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSourceCodeClicked = () => {
    window.open('https://github.com/anxelic/Senior-Project/tree/main', '_blank');
    setOpen(false);
  }

  const handleDavidClicked = () => {
    window.open('https://github.com/Risemon2', '_blank');
    setOpen(false);
  }

  const handleChrisClicked = () => {
    window.open('https://github.com/anxelic', '_blank');
    setOpen(false);
  }

  const handleStephaneClicked = () => {
    window.open('https://github.com/stephaneK123', '_blank');
    setOpen(false);
  }

  const handleLoganClicked = () => {
    window.open('https://github.com/alumnu', '_blank');
    setOpen(false);
  }

  const handleKerryBethClicked = () => {
    window.open('https://github.com/Kerrybeth', '_blank');
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
        pointerEvents: guest === true ? "none" : "unset"
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
        <DialogTitle align={"center"} id="alert-dialog-title">
          {"About"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here are the awesome people that dedicated their time to put this together! Please report
            any issues, and we hope it provided some value to you!
          </DialogContentText>

          {/* authors + clicks to socials  */}
          <List sx={{ width: '100%', p: 1, m: 1 }}>
            {/* first card */}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="Chris - "
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I'll be in your neighborhood doing errands this…
                    </Typography>
                  </React.Fragment>

                }
              />

              <IconButton onClick={handleChrisClicked}>
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => true}>
                <LinkedInIcon />
              </IconButton>
            </ListItem>

            <Divider variant="inset" component="li" />

            {/* another card */}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="David - "
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I'll be in your neighborhood doing errands this…
                    </Typography>
                  </React.Fragment>

                }
              />
              <IconButton onClick={handleDavidClicked}>
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => true}>
                <LinkedInIcon />
              </IconButton>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="Logan - "
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I'll be in your neighborhood doing errands this…
                    </Typography>
                  </React.Fragment>

                }
              />
              <IconButton onClick={handleLoganClicked}>
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => true}>
                <LinkedInIcon />
              </IconButton>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="KarryBeth - "
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I'll be in your neighborhood doing errands this…
                    </Typography>
                  </React.Fragment>

                }
              />
              <IconButton onClick={handleKerryBethClicked}>
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => true}>
                <LinkedInIcon />
              </IconButton>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="Stephane Katende - Software Engineer"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I like doing a lot of things, given I have the energy :)
                    </Typography>
                  </React.Fragment>

                }
              />
              <IconButton onClick={handleStephaneClicked}>
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => true}>
                <LinkedInIcon />
              </IconButton>
            </ListItem>

          </List>

        </DialogContent>
        <DialogActions sx={{ alignContent: "center", color: colors.main[400] }}>
          <Button onClick={handleSourceCodeClicked}>Source code</Button>
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