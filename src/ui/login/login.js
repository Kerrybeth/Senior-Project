import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../auth/UserAuthContext";
import { Cookies } from "react-cookie";
import { userLoggedIn } from "../../redux/userSlice";
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

const Login = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth() || createContext({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function writeUserData() {

  }

  const handleGuestSignIn = () => {
    signInAnonymously(auth).catch(alert);
    dispatch(userLoggedIn());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await logIn(email, password);
      navigate("/");
      dispatch(userLoggedIn());
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      setError("could not handle submit: " + err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      dispatch(userLoggedIn());
    } catch (error) {
      console.log("could not sign in with google: " + error.message);
    }
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  function TypographyTheme() {
    return (<Div>{"CalandarBoard"}</Div>);
  }

  return (
    <>
      <TypographyTheme />
      <Box display={"flex"}>
        <div className="chunk">
          <div className="loginbody">
            <div className="p-4 box">
              <h2 className="mb-3">Firebase Auth Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
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

                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit">
                    Log In
                  </Button>
                </div>
              </Form>
              <hr />
              <div>
                <GoogleButton
                  className="g-btn"
                  type="dark"
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
              </div>
            </div>

            <div className="p-4 box mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>

            <div className="p-4 box mt-3 text-center">
              Forgot password? <Link to="/signup">Reset</Link>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Login;