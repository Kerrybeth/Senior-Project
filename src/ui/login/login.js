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

const Login = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function writeUserData() {

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
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
      dispatch(userLoggedIn());
    } catch (error) {
      console.log(error.message);
    }
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  function TypographyTheme() {
    return <Div>{"CalandarBoard"}</Div>;
  }

  return (
    <>
      <TypographyTheme />
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
            </div>
          </div>
          <div className="p-4 box mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;