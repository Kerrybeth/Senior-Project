import EventCarousel from "./EventCarousel";
import { Calendar } from "../components/Calendar";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Home = () => {

  const { user, guest, sucess } = useSelector(
		(state) => state.user
	)

  const db = getDatabase(); 
        if(guest == false && user != undefined){
        update(ref(db, 'users/' + user.uid + '/profile'), {
            email: user.email
        });
      }

  return (
    <>
    <Box m={3}>
      <br></br>
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
      </Box>
    </>
  );
};

export default Home;
