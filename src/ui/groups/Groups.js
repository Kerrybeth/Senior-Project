import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, child } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import '../../App.css';

const Groups = () => {
    const { user, error, sucess } = useSelector(
        (state) => state.user
    )

    // using 2 separate useStates for both group names and descriptions
    // can't figure out another way to do it so this works for now
    let groupsTemp = [];
    let descsTemp = [];
    let idtemp = [];
    const [groups, setGroups] = useState([]);
    const [descs, setDescs] = useState([]);
    const [groupID, setGroupID] = useState([]);

    useEffect(() => {
        // firebase things
        const db = getDatabase();
        const dataRef = ref(db, 'groups/');

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                for (let i = 0; i < childSnapshot.val().members.length; i++) {
                    if (user.uid == childSnapshot.val().members[i]) {
                        let name = childSnapshot.val().name;
                        let desc = childSnapshot.val().desc;
                        let groupid2 = childSnapshot.key;

                        idtemp.push(groupid2);
                        groupsTemp.push(name);
                        descsTemp.push(desc);
                    }
                }
            });

            setGroupID(idtemp);
            setGroups(groupsTemp);
            setDescs(descsTemp);
            groupsTemp = [];
            descsTemp = [];
            idtemp = [];
        });

    }, [user]);     

    function GroupDisplay() {
        if (groups.length === 0) {
            return (
                <ListGroup.Item>
                    <div>You aren't in any groups yet!</div>
                </ListGroup.Item>
            );
        } else {
            return (
                <div>
                    {groups.map((name, i) => (
                        <ListGroup.Item key={i}>
                            <Link to={`/groups/${groupID[i]}`}> {/* Link to the corresponding GroupPage */}
                                <div>
                                    <div className="fw-bold">{name}</div>
                                    <div>{descs[i]}</div>
                                </div>
                            </Link>
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
                                <div style={{ padding: 5 }}>
                                    <Button variant="success">Accept</Button> <Button variant="danger">Deny</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Tab>
                </Tabs>
            </div>
            <Link to="/creategroup">
                <Button variant="secondary">
                    Create group
                </Button>
            </Link>
        </div>
    );
}

export default Groups;