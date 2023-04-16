import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Cookies } from "react-cookie";
import { guestUserLoggedin, userLoggedIn } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { auth } from "../../firebase.js";
import * as firebase from "firebase/auth";
import { browserSessionPersistence, signInAnonymously } from "firebase/auth";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createContext } from "react";
import { useSelector } from "react-redux";
import { logIn, googleSignIn } from "../../firebase.js";
import Typography from '@mui/material/Typography';

const Login = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function writeUserData() {

  }

  const handleGuestSignIn = () => {
    // signInAnonymously(auth).catch(alert);
    dispatch(guestUserLoggedin());
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await logIn(email, password);
      dispatch(userLoggedIn());
      navigate("/");
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      setError("could not handle submit: " + err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/")
      dispatch(userLoggedIn());
    } catch (error) {
      console.log("could not sign in with google: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'colum',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box display={"grid"} alignContent={"center"}>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          CalandarBoard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          A personal planner that allows users to manage their own schedule, compare schedules with other users, and see what's going on
          . Users can also create organizations/groups, schedule meetings within
          it, and manage the privacy and permissions of it.
        </Typography>

        {_error && <Alert variant="danger">{_error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" type="Submit" sx={{}}>
          Log In
        </Button>
      </Box>

      <hr />
      <GoogleButton
        className="g-btn"
        type="dark"
        sx={{ outerWidth: "50%" }}
        onClick={handleGoogleSignIn}
      />
      <Box m={1} textAlign={"center"}>
        <Button onClick={handleGuestSignIn} >Login as guest</Button>
      </Box>

      <Box p={1} m={1} textAlign={"center"} sx={{ backgroundColor: "lightgrey" }}>
        <h6>Rememeber Me</h6>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="no" control={<Radio />} label="Yes" />
            <FormControlLabel value="yes" control={<Radio />} label="No" defaultChecked={"true"} />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box display={"flex"} justifyContent={"space-evenly"} alignContent={"center"}>
        <Button component={Link} to="/signup" variant="outlined"> Need An Account? Sign up</Button>
        <Button component={Link} to="/signup" variant="outlined"> Reset Password</Button>
      </Box>
    </Box >
  );
};

export default Login;