import { useState, useEffect } from 'react';
import { getDatabase, ref, query, onValue, orderByChild } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { Carousel, Card, CardGroup } from 'react-bootstrap';

function EventCarousel() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = getAuth().currentUser;
  let eventsTemp = [];

  useEffect(() => {
    const db = getDatabase();  
    const dataRef = query(ref(db, 'users/' + user.uid + '/events'), orderByChild('start'));

    onValue(dataRef, (snapshot) => {
      snapshot.forEach(childSnapshot => {
        let title = childSnapshot.val().title;
        let start = childSnapshot.val().start;
        let end = childSnapshot.val().end;
        let location = childSnapshot.val().location;

        eventsTemp.push({"title": title, "start": start, "end": end, "location": location});
      });

      setEvents(eventsTemp);
      eventsTemp = [];
    });
  }, [user]);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + events.length) % events.length);
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % events.length);
  }

  return (
    <div className="App">
      <Carousel interval='10000' controls={false} indicators={false}>
        {events.map((event, index) => (
          <Carousel.Item key={index}>
            <CardGroup>
              <Card bg='dark'>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>Start Date and Time: {event.start}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" onClick={handlePrev}>Prev</button>
        <button className="btn btn-secondary" onClick={handleNext}>Next</button>
      </div> */}
    </div>
  );
}

export default EventCarousel;