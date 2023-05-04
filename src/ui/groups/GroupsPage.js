import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import '../../App.css';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';

const GroupsPage = () => {

    const { user, error, sucess } = useSelector(
		(state) => state.user
	)

    const location = useLocation(); // React Hook
    const groupId = (location.pathname).slice(8);
    const db = getDatabase();
    const dataRef = ref(db, `groups/${groupId}`);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [admin, setAdmin] = useState("");
  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const group = snapshot.val();
            setName(group.name);
            setDesc(group.desc);
        });
    }, [dataRef]);

    function DisplayEdit () {
        const dataRef = ref(db, `groups/${groupId}/admins`);
        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (user.uid === childSnapshot.val()) {
                    setAdmin(childSnapshot.val());
                }
            });
        });
        if (user.uid === admin) {
            return (
                <Link to={`/groups/${groupId}/edit`}>
				    <Button variant="contained" sx={{ maxHeight: '50px', }}>
					    <Typography variant="h4" style={{ justifyContent: 'right', alignItems: 'right' }}>
						    Edit
					    </Typography>
				    </Button>
			    </Link>
            );
        } else {
            return;
        }
    }
  
    return (
        <div className="group-page">
            <br></br>
            <h1>{name}</h1>
            <p>{desc}</p>
            <DisplayEdit />
            <Link to="/groups">Back to Groups</Link>
        </div>
    );
}

export default GroupsPage;  