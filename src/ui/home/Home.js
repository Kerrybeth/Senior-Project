import EventCarousel from './EventCarousel';

import '../../App.css';
import FullCalendar from '@fullcalendar/react';
import Calendar from '../components/calendar';

function Home() {
    return (
    <div className="App">
        <div className="pageLight">
            <EventCarousel></EventCarousel>
            <div id="calendar"><Calendar /></div>
        </div>
    </div>
    );
  }
  
  export default Home;
  