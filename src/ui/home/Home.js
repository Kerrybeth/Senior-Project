import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../auth/UserAuthContext";
import EventCarousel from "./EventCarousel";

const Home = () => {
  // const { logOut, user } = useUserAuth();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };


  return (
    <>
      <div classname="App">
        <div className="pageLight">
          <EventCarousel></EventCarousel>
          <div className="d-grid gap-2">
            <Button variant="primary" >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
