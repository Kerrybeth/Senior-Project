import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../auth/UserAuthContext";
import EventCarousel from "./EventCarousel";

const Home = () => {

  return (
    <>
      <div classname="App">
        <div className="pageLight">
          <EventCarousel></EventCarousel>
          <div className="d-grid gap-2">
            <div id="calendar">
              calendar here
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
