import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import '../../App.css';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { GroupCalendar } from "../components/GroupCalendar";

const GroupsPage = () => {

    const { user, error, sucess } = useSelector(
		(state) => state.user
	)

    let tempMems = [];

    const location = useLocation(); // React Hook
    const groupId = (location.pathname).slice(8);
    const db = getDatabase();
    const dataRef = ref(db, `groups/${groupId}`);
    const dataRefMembers = ref(db, `groups/${groupId}/members`);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [admin, setAdmin] = useState("");
    const [mem, setMems] = useState([]);
  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const group = snapshot.val();
            setName(group.name);
            setDesc(group.desc);
        });

        onValue(dataRefMembers, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                tempMems.push(childSnapshot.val());
            });

            setMems(tempMems);
            tempMems = [];
        });

    }, [user]);

    function findEmail(uid) {
        let theirEmail;
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (uid == childSnapshot.key) {
                    theirEmail = childSnapshot.child('profile').child('email').val();
                }
            });
        });

        return theirEmail;
    }

    function findImage(uid) {
        let theirImage;
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (uid == childSnapshot.key) {
                    theirImage = childSnapshot.child('profile').child('image').val();
                }
            });
        });

        return theirImage;
    }
    

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
    
    function DisplayMembers() {
        return (
            <div>
                {mem.map((mem) => (
                    <ListGroup.Item>
                        <Link to={`/user/${mem}`} style={{textDecoration: 'none'}}> {/* Link to the corresponding userpage */}
                    <div style={{padding:5}}>
                        <Image src={findImage(mem)} roundedCircle className="listThumbnail" />
                        {' '}{findEmail(mem)}
                    </div>
                    </Link>
                    </ListGroup.Item>
                ))}
            </div>
        );
    }
  
    return (
        <div class="pageLight2">
            <br></br>
            <br></br>
            <h1>{name}</h1>
            <p>{desc}</p>
            <DisplayEdit />
            <Link to="/groups">Back to Groups</Link>
            <h4 style={{paddingTop:'5vh'}}>Members</h4>
            <div style={{width:'50vw', overflowY:'auto', maxHeight:'20vh'}}>
            <ListGroup>
                <DisplayMembers />
            </ListGroup>
            </div>
            <div id="usercalendar"><GroupCalendar uid={groupId} /></div>
        </div>
    );
}

export default GroupsPage;  