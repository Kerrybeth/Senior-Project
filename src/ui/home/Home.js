import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../auth/UserAuthContext";
import EventCarousel from "./EventCarousel";
import Calendar from "../components/calendar"

const Home = () => {

  const { user } = useUserAuth();

  return (
    <>
      <div classname="App">
        <div className="pageLight">
          <EventCarousel></EventCarousel>
          {/*<div className="d-grid gap-2">*/}
            <div id="calendar">
              <Calendar />
            </div>
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default Home;
