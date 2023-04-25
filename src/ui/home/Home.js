import EventCarousel from "./EventCarousel";
import { Calendar } from "../components/Calendar";

const Home = () => {

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
