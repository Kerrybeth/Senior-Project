import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue, child, push, remove, update, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import '../../App.css';
import Image from 'react-bootstrap/Image';

const Groups = () => {
    const { user, error, sucess } = useSelector(
        (state) => state.user
    )

    // using 2 separate useStates for both group names and descriptions
    // can't figure out another way to do it so this works for now
    let groupsTemp = [];
    let descsTemp = [];
    let idtemp = [];
    let requestsTemp = [];
    let membersTemp = [];
    const [groups, setGroups] = useState([]);
    const [descs, setDescs] = useState([]);
    const [groupID, setGroupID] = useState([]);
    const [requests, setRequests] = useState([]);
    const [membersNew, setMembersNew] = useState([]);
    const db = getDatabase();

    useEffect(() => {
        // firebase things
        
        const dataRef = ref(db, 'groups/');

        onValue(dataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                    childSnapshot.forEach(groupAt => {
                        if (groupAt.key === "members") {
                            groupAt.forEach(member => {
                                if (user.uid === member.val()) {
                                    let name = childSnapshot.val().name;
                                    let desc = childSnapshot.val().desc;
                                    let groupid2 = childSnapshot.key;
            
                                    idtemp.push(groupid2);
                                    groupsTemp.push(name);
                                    descsTemp.push(desc);
                                }
                            })
                        }
                    });
                });
            setGroupID(idtemp);
            setGroups(groupsTemp);
            setDescs(descsTemp);
            groupsTemp = [];
            descsTemp = [];
            idtemp = [];
        });

        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == "groupinv") {
                    let x = childSnapshot.child("groupid").val();
                    //alert(x);
                    requestsTemp.push(x);
                }
                
            });
        });

        setRequests(requestsTemp);
        requestsTemp = [];

    }, [user]);     

    function findUid(em) {
        let theirUid;
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let email = childSnapshot.child("profile").child("email").val();
                if (em == email) {
                    theirUid = childSnapshot.key;
                }
            });
        });

        return theirUid;
    }

    function getName(gid) {
        let groupname;
        onValue(ref(db, 'groups/' + gid), (snapshot) => {
            groupname = snapshot.child("name").val();
        });
        return groupname;
    }

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

    function DisplayRequests() {
        // onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
        //     snapshot.forEach(childSnapshot => {
        //         let x = childSnapshot.val();
        //     });
        // });
        return (
            <div>
                {requests.map((groupid, i) => (
                    <ListGroup.Item key={i}>
                    <div><Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />{getName(groupid)}</div>
                    <div style={{padding:5}}>
                        {' '}
                        <Button variant="success" onClick={() => acceptRequest(groupid)}>Accept</Button>{' '} <Button variant="danger" onClick={() => denyRequest(groupID[i])}>Deny</Button>{' '}
                    </div>
                    </ListGroup.Item>
                ))}
            </div>
        );
    }

    async function acceptRequest(req) {
        let membersSnapshot = await get(ref(db, 'groups/' + req + '/members'));
        let membersTemp = [];
      
        membersSnapshot.forEach((childSnapshot) => {
            let mem = childSnapshot.val();
            membersTemp.push(mem);
        });
      
        membersTemp.push(user.uid);
      
        await update(ref(db, 'groups/' + req), {
            members: membersTemp
        });
      
        let notificationsSnapshot = await get(ref(db, 'users/' + user.uid + '/notifications'));
      
        notificationsSnapshot.forEach((childSnapshot) => {
            if (childSnapshot.child('type').val() === 'groupinv' && childSnapshot.child('groupid').val() === req) {
                remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
            }
        });
    }
      

    async function denyRequest(req) {
        let notificationsSnapshot = await get(ref(db, 'users/' + user.uid + '/notifications'));
      
        notificationsSnapshot.forEach((childSnapshot) => {
            if (childSnapshot.child('type').val() === 'groupinv' && childSnapshot.child('groupid').val() === req) {
                remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
            }
        });
    }

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
                            <Link to={`/groups/${groupID[i]}`} style={{textDecoration: 'none'}}> {/* Link to the corresponding GroupPage */}
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
                            <DisplayRequests />
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