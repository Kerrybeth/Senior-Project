import { useState } from 'react';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';

const AvailEdit = () => {

    const navigate = useNavigate();
    const [availability, setavailability] = useState([
        { day: 'Monday', start: '', end: '' },
        { day: 'Tuesday', start: '', end: '' },
        { day: 'Wednesday', start: '', end: '' },
        { day: 'Thursday', start: '', end: '' },
        { day: 'Friday', start: '', end: '' },
        { day: 'Saturday', start: '', end: '' },
        { day: 'Sunday', start: '', end: '' },
    ]);

    const handleTimeChange = (event, day, field) => {
        const updatedTimes = availability.map((time) => {
            if (time.day === day) {
                return { ...time, [field]: event.target.value };
            }
            return time;
        });
        setavailability(updatedTimes);
    };

    const handleSubmit = () => {
        const user = getAuth().currentUser;
        const db = getDatabase();
        //is stored under user/profile/availability/availability. no idea how to stop
        //it from doing it twice. week starts on monday, ends sunday
        //monday is represented as 0, sunday is 6
        set(ref(db, 'users/' + user.uid + '/profile' + '/availability'), {
            availability
        });

        navigate("/User")
    };


    return (
        <Box p={2} fontSize={"10x"}>
            <form onSubmit={handleSubmit}>
                <br></br>
                {availability.map(({ day, start, end }) => (
                    <Box m={1} >
                        <div key={day}>
                            <label htmlFor={`${day}-start`}>{day} Start Time:</label>
                            <input
                                type="time"
                                id={`${day}-start`}
                                value={start}
                                onChange={(e) => handleTimeChange(e, day, 'start')}
                            />
                            <label htmlFor={`${day}-end`}>{day} End Time:</label>
                            <input
                                type="time"
                                id={`${day}-end`}
                                value={end}
                                onChange={(e) => handleTimeChange(e, day, 'end')}
                            />
                            <br></br>
                        </div>

                    </Box>
                ))}

                <button type="submit">Submit</button>
            </form>
        </Box>
    );
};

export default AvailEdit;