import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";
import { useContext, useState } from "react";

import '../../App.css';

function Groups() {
    const user = useContext(userAuthContext);

    function Groups() {
        // firebase things
        const db = getDatabase();  
        const dataRef = ref(db, 'groups/');
        let element;

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                //alert(childSnapshot.val().members[0]);

                for (let i = 0; i < childSnapshot.val().members.length; i++) {
                    //alert(childSnapshot.val().members[i]);

                    if (user.user.uid == childSnapshot.val().members[i]) {
                        alert("fired");
                        element += (
                            <ListGroup.Item>
                                <div>
                                <div className="fw-bold">{childSnapshot.val().name}</div>
                                    {childSnapshot.val().desc}
                                </div>
                            </ListGroup.Item>
    
                        );
                    }
                }
            });
        });

        alert(element);
        return element;
    }

    return (
    <div className="pageLight">
        <div className="tabList">
        <Tabs
            defaultActiveKey="first"
            id="groups-tabs"
            className="mb-3"
        >
            <Tab eventKey="first" title="Groups">
            <ListGroup>
                <Groups />
            </ListGroup>
            </Tab>
            <Tab eventKey="second" title="Invites">
            <ListGroup>
                <ListGroup.Item>You were invited to "Group 2" by Logan Tiraboschi 
                    <div style={{ padding:5 }}>
                        <Button variant="success">Accept</Button> <Button variant="danger">Deny</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
            </Tab>
        </Tabs>
        </div>
		<Link to= "/CreateGroup">
			<Button variant="secondary">
				Create group
			</Button>
		</Link>
    </div>
    );
  }
  
  export default Groups;