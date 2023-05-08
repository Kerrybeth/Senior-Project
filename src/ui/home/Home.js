import EventCarousel from "./EventCarousel";
import { Calendar } from "../components/Calendar";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { useSelector } from "react-redux";

const Home = () => {

  const { user, guest, sucess } = useSelector(
		(state) => state.user
	)

  const db = getDatabase(); 
        if(guest == false){
        update(ref(db, 'users/' + user.uid + '/profile'), {
            email: user.email
        });
      }

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
