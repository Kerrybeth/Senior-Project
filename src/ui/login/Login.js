import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Cookies } from "react-cookie";
import { guestUserLoggedin, userLoggedIn, userLoggedInAndNotSetRememberMe, userLoggedInAndSetRememberMe } from "../../redux/userSlice";
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
  const [rememberMe, setRememberMe] = useState("false");
  const [_error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function writeUserData() {

  }

  useEffect(() => {
    if (rememberMe == "true") {
      dispatch(userLoggedInAndSetRememberMe())
    } else if (rememberMe == "false") {
      dispatch(userLoggedInAndNotSetRememberMe())
    }
  }, [rememberMe]);

  const handleGuestSignIn = () => {
    // signInAnonymously(auth).catch(alert);
    dispatch(guestUserLoggedin());
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    logIn(email, password).then((res) => {
      if (res) {
        dispatch(userLoggedIn(res.user));
        navigate("/");
      } else {
        setError(res.error);
      }
    })
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await googleSignIn();
      if (result) {
        dispatch(userLoggedIn(result.user))
        navigate("/")
      }
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
        m: 15
      }}
    >
      <Box display={"grid"} alignContent={"center"}>
        <Typography variant="h1" sx={{ textAlign: "center", m: 1, p: 1 }}>
          CalandarBoard
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ m: 1, p: 1 }}>
          A lightweight personal planner and social web app. Allows users to manage their schedules, avaialbity, compare schedules, and get connected to their communities. Users can also create organizations/groups, schedule meetings within it, and manage the privacy and permissions of it. Overall, the main goal is to seamlessly integratate into your exists community and give a place to discover and communicate. It gives rich options to integrate a user's calandar, contacts, emails, events, and more!
        </Typography>

        {_error && <Alert variant="danger">{_error}</Alert>}

        <Form onSubmit={handleSubmit} sx={{ m: 2, p: 1 }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" style={{
            marg
              : 5, padding: 2
          }}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" size="small" type="Submit" onClick={handleSubmit} sx={{ m: 2, p: 1, }}>
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
        <FormControl defaultValue="no">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="false"
            name="radio-buttons-group"
          >
            <FormControlLabel onChange={(e) => setRememberMe(e.target.value)} value="true" control={<Radio />} label="Yes" />
            <FormControlLabel onChange={(e) => setRememberMe(e.target.value)} value="false" control={<Radio />} label="No" defaultChecked={"true"} />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box display={"flex"} justifyContent={"space-evenly"} alignContent={"center"}>
        <Button variant="text" onClick={() => navigate("/signup")}> Need An Account? Sign up</Button>
        <Button variant="text" onClick={() => navigate("/reset")}> Reset Password</Button>
      </Box>
    </Box >
  );
};

export default Login;