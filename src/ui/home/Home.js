import EventCarousel from './EventCarousel';

import '../../App.css';

function Home() {
    return (
    <div className="App">
        <div className="pageLight">
            <EventCarousel></EventCarousel>
            <div id="calendar">CALENDAR HERE</div>
        </div>
    </div>
    );
  }
  
  export default Home;
  