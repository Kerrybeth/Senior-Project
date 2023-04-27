import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import '../../App.css';

const GroupsPage = () => {

    const location = useLocation(); // React Hook
    const groupId = (location.pathname).slice(8);
    //const { groupId } = window.location.pathname;
    //console.log(groupId);
    const db = getDatabase();
    const dataRef = ref(db, `groups/${groupId}`);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
  
    useEffect(() => {
        onValue(dataRef, (snapshot) => {
            const group = snapshot.val();
            setName(group.name);
            setDesc(group.desc);
        });
    }, [dataRef]);
  
    return (
        <div className="group-page">
            <h1>{name}</h1>
            <p>{desc}</p>
            <Link to="/groups">Back to Groups</Link>
        </div>
    );
}

export default GroupsPage;  