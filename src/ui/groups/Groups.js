import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";
import { useContext, useEffect, useState } from "react";

import '../../App.css';

const Groups = () => {
    const user = useContext(userAuthContext);
    let groupsTemp = [];
    let descsTemp = [];

    const [groups, setGroups] = useState([]);
    const [descs, setDescs] = useState([]);

    useEffect(() => {
        // firebase things
        const db = getDatabase();  
        const dataRef = ref(db, 'groups/');

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                for (let i = 0; i < childSnapshot.val().members.length; i++) {
                    if (user.user.uid == childSnapshot.val().members[i]) {
                        let name = childSnapshot.val().name;
                        let desc = childSnapshot.val().desc;
                        
                        groupsTemp.push(name);
                        descsTemp.push(desc);
                    }
                }
            });

            setGroups(groupsTemp);
            setDescs(descsTemp);
            groupsTemp = [];
            descsTemp = [];
        });

    }, [user]);

    /**
     * @returns a list of groups the current user is a part of, or a message if in no groups
     */
    function GroupDisplay() {
        if (groups == []) {
            return (
                <ListGroup.Item>
                    <div>You aren't in any groups yet!</div>
                </ListGroup.Item>
            );
        } else {
            return (
                <div>
                    {groups.map((name, i) => (
                        <ListGroup.Item>
                        <div>
                            <div className="fw-bold">{name}</div>
                            <div>{descs[i]}</div>
                        </div>
                        </ListGroup.Item>
                    ))}
                </div>
            );
        }
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
                <GroupDisplay />
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