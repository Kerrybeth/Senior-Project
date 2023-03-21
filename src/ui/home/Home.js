import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../auth/UserAuthContext";
import EventCarousel from "./EventCarousel";
import { Calendar } from "../components/calendar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {

  const { user } = useUserAuth();
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
      navigate("/login")
    }
  });


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
