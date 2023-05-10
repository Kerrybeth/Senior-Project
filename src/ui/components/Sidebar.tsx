import { Avatar, Drawer, List, Stack, Toolbar, TextField, FormControl, Button, Box } from "@mui/material";
import assets from "../../assets";
import { colorConfigs } from "./configs";
import { sizeConfigs } from "./configs";
import appRoutes from "../layout+routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
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
import BugReportIcon from '@mui/icons-material/BugReport';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useState } from "react";
import { Link } from "react-router-dom"
import { Bug } from "tabler-icons-react";

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
                I'll be looking for animals in the closed forest
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
                I'll be sleeping before you know it
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
                Winner, Winner, Chicken, and Dinner.
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
                I'll be in your neighborhood doing errands
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

const BugReport = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }

    if (email && password) {
      console.log(email, password)
    }
  }

  return (
    <Box m={1}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Description of bug"
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <TextField
          label="Steps to reproduce"
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />

        <TextField
          label="Description of Expected vs Actual Behavior?"
          onChange={e => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />

        <TextField
          label="How severe is this bug? "
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />


        <Button sx={{ m: 1 }} variant="outlined" color="secondary" type="submit">Submit</Button>

      </form>
      <Button sx={{ m: 1 }} variant="contained" onClick={() => window.open('https://github.com/anxelic/Senior-Project/tree/main', '_blank')} >
        Do it manually instead
      </Button>
    </Box>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
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
                <Avatar alt="C" src="https://us.123rf.com/450wm/lightfieldstudios/lightfieldstudios1904/lightfieldstudios190410410/121460786-white-letter-c-with-beige-roses-and-green-leaves-isolated-on-grey.jpg" />
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
                <Avatar alt="D" src="https://us.123rf.com/450wm/inkdrop/inkdrop1910/inkdrop191006642/132480573-letter-d-distorted-neon-glitch-effect-text-font-3d-render.jpg?ver=6" />
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
                <Avatar alt="L" src="https://img.freepik.com/premium-photo/fire-alphabet-letter-l-isolated-black-background_564276-9249.jpg" />
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
                <Avatar alt="Remy Sharp" src="https://i.pinimg.com/474x/98/19/f9/9819f98e687a6d92f265f128fc95bd2b.jpg" />
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
                <Avatar alt="SK" src="https://media.istockphoto.com/id/1392002841/photo/glowing-glass-tube-font-letter-s-3d.jpg?b=1&s=170667a&w=0&k=20&c=ESLB9ElLfMXnXy2qylqinpC8b5_AaEuJrx7_Nw3ZFOI=" />
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
        <DialogActions sx={{ alignContent: "center", backgroundColor: colors.main[700] }}>
          <Button onClick={handleSourceCodeClicked}>Source code</Button>
          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Typography onClick={handleClickOpen} variant="caption" display="block" gutterBottom sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} >
        CalendarBoard Beta v1.0.0
      </Typography>

      <IconButton onClick={() => setOpen1(true)}>
        <BugReportIcon />
      </IconButton>

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align={"center"} id="alert-dialog-title">
          {"CalandarBoard Bug Report"}
        </DialogTitle>
        <DialogContent>
          <BugReport />
        </DialogContent>
        <DialogActions sx={{ alignContent: "center", backgroundColor: colors.main[700] }}>
          <Button onClick={handleClose1}>Nevermind</Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;