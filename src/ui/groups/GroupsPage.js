import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import '../../App.css';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

const GroupsPage = () => {

    const { user, error, sucess } = useSelector(
		(state) => state.user
	)

    const location = useLocation(); // React Hook
    const groupId = (location.pathname).slice(8);
    //const { groupId } = window.location.pathname;
    //console.log(groupId);
    const db = getDatabase();
    const dataRef = ref(db, `groups/${groupId}`);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    //const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const group = snapshot.val();
            setName(group.name);
            setDesc(group.desc);
        });
    }, [dataRef]);

    // function getContacts() {
    //     onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
    //         snapshot.forEach(childSnapshot => {
    //             setContacts(childSnapshot.val().name);
    //         });
    //     });
    // }

    // function Option() {
    //     return (
    //         <div>
    //         {contacts.map((name) => (
    //             <option value={name}>{name}</option>
    //         ))}
    //         </div>
    //     );
    // }
  
    return (
        <div className="group-page">
            <h1>{name}</h1>
            <p>{desc}</p>
            <Link to="/groups">Back to Groups</Link>
            {/* <Form.Select aria-label="Default select example" onClick={getContacts}>
                <Option />
            </Form.Select> */}
        </div>
    );
}

export default GroupsPage;  