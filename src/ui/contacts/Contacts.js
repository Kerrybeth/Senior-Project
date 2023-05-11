import React, { useState, useContext, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas'
//import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../App.css';

const Contacts = () => {
    // offcanvas stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // auth
    //const user = getAuth().currentUser;
    const { user, error, sucess } = useSelector(
        (state) => state.user
    )

    // storage for db results
    let contactsTemp = [];
    let emailsTemp = [];
    let requestsTemp = [];
    let uidTemp = [];
    let imgTemp = [];
    let searchImgTemp = [];
    const [contacts, setContacts] = useState([]);
    const [uid, setUid] = useState([]);
    const [emails, setEmails] = useState([]);
    const [requests, setRequests] = useState([]);
    const [images, setImages] = useState([]);
    const [searchImages, setSearchImages] = useState([]);

    // db
    const db = getDatabase();

    /**
     * update list of contacts with list in db
     */
    useEffect(() => {
        // pulling contacts
        onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let name = childSnapshot.val().name;
                let uid = childSnapshot.val().uid;
                let img = null;

                onValue(ref(db, 'users/' + uid + '/profile'), (snapshot) => {
                    if (snapshot.exists) {
                        img = snapshot.val()?.image
                    } else {
                        img = null
                    }
                });

                contactsTemp.push(name);
                uidTemp.push(uid);
                if (img == null) {
                    img = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                }
                imgTemp.push(img);
            });

            setUid(uidTemp);
            setContacts(contactsTemp);
            setImages(imgTemp);
            contactsTemp = [];
            uidTemp = [];
            imgTemp = [];
        });

        // pulling requests
        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child('type').val() == 'req') {
                    let email = findEmail(childSnapshot.child('name').val());
                    requestsTemp.push(email);
                }
            });

            setRequests(requestsTemp);
            requestsTemp = [];
        });
    }, []);

    /**
     * 
     * @param {*} uid 
     * @returns email associated with given uid
     */
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

    /**
     * @returns listgroup of contacts
     */
    function ContactDisplay() {
        if (contacts.length === 0) {
            return (
                <div>
                    <ListGroup.Item>
                        You have no contacts! Click the button below to add one now.
                    </ListGroup.Item>
                </div>
            );
        } else {
            return (
                <div>
                    {contacts.map((em, i) => (
                        <ListGroup.Item>
                            <Link to={`/user/${uid[i]}`}> {/* Link to the corresponding userpage */}
                                <div style={{ padding: 5 }}>
                                    <Image src={images[i]} roundedCircle className="listThumbnail" />
                                    {' '}{em}
                                </div>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </div>
            );
        }
    }

    /**
     * deals with the search functionality of the add contact area
     * pulls from database a user email when query matches data in db
     * @param {*} event 
     */
    const handleSearchInputChange = (event) => {
        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                let email = childSnapshot.child("profile").child("email").val();
                let img = null;

                if (email == event.target.value.toLowerCase()) {
                    emailsTemp.push(email);
                }

                // get pfp
                onValue(ref(db, 'users/' + findUid(email) + '/profile'), (snapshot) => {
                    img = snapshot.val()?.image;
                    searchImgTemp.push(img);
                });
            });


            setEmails(emailsTemp);
            setSearchImages(searchImgTemp);
            emailsTemp = [];
            searchImgTemp = [];
        });
    }

    /**
     * 
     * @returns a listgroup of matching emails (technically should only be one in the current configuration)
     */
    function DisplayResults() {
        return (
            <div>
                {emails.map((em) => (
                    <ListGroup.Item>
                        <div style={{ padding: 5 }}>
                            <Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />
                            {' '}{em}
                            <Button style={{ float: 'right', marginTop: -6 }} onClick={() => addContact(em)}>Add</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </div>
        );
    }

    /**
     * ability to send request to other user 
     * @param {*} em - email to send request to
     */
    function addContact(em) {
        let theirUid = findUid(em);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        if (reqCheck(theirUid) && theirUid != null) {
            push(ref(db, 'users/' + theirUid + '/notifications'), {
                type: 'req',
                name: user.uid,
                body: `You have a friend request from ${user.email}.`,
                time: `sent at ${dateTime}`,
                from: "CalandarBoard",
            });
        }
    }

    /**
     * @param {*} em 
     * @returns uid of user associated with email
     */
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

    /**
     * @param {*} uid 
     * @returns false if request already exists in database, true otherwise
     */
    function reqCheck(uid) {
        let req = true;
        onValue(ref(db, 'users/' + uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'req' && childSnapshot.child("name").val() == user.uid) {
                    req = false;
                }
            });
        });

        return req;
    }

    /**
     * accepts contact request
     * @param {} req - email of sending user
     */
    function acceptRequest(req) {
        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'req' && childSnapshot.child("name").val() == findUid(req)) {
                    // adds sendee to your contacts list
                    push(ref(db, 'users/' + user.uid + '/contacts'), {
                        name: req,
                        uid: findUid(req)
                    });

                    // adds yourself to sendee's contacts list
                    push(ref(db, 'users/' + findUid(req) + '/contacts'), {
                        name: findEmail(user.uid),
                        uid: user.uid
                    });

                    remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
                }
            });
        });
    }

    /**
     * denies contact request
     * @param {*} req - email fo sending user
     */
    function denyRequest(req) {
        onValue(ref(db, 'users/' + user.uid + '/notifications'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.child("type").val() == 'req' && childSnapshot.child("name").val() == findUid(req)) {
                    remove(ref(db, 'users/' + user.uid + '/notifications/' + childSnapshot.key));
                }
            });
        });
    }

    /**
     * @returns listgroup of contacts
     */
    function ContactDisplay() {
        if (contacts.length === 0) {
            return (
                <div>
                    <ListGroup.Item>
                        You have no contacts! Click the button below to add one now.
                    </ListGroup.Item>
                </div>
            );
        } else {
            return (
                <div>
                    {contacts.map((em, i) => (
                        <ListGroup.Item>
                            <Link to={`/user/${uid[i]}`} style={{ textDecoration: 'none' }}> {/* Link to the corresponding userpage */}
                                <div style={{ padding: 5 }}>
                                    <Image src={images[i]} roundedCircle className="listThumbnail" />
                                    {' '}{em}
                                </div>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </div>
            );
        }
    }

    /**
     * 
     * @returns a listgroup of matching emails (technically should only be one in the current configuration)
     */
    function DisplayResults() {
        // if (searchImages.length === 0) {
        return (
            <div>
                {emails.map((em) => (
                    <ListGroup.Item>
                        <div style={{ padding: 5 }}>
                            <Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />
                            {' '}{em}
                            <Button style={{ float: 'right', marginTop: -6 }} onClick={() => addContact(em)}>Add</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </div>
        );
        // } else {
        //     return (
        //         <div>
        //             {emails.map((em, i) => (
        //                 <ListGroup.Item key={i}>
        //                     <div style={{padding:5}}>
        //                         <Image src={searchImages[i]} roundedCircle className="listThumbnail" />
        //                         {' '}{em}
        //                         <Button style={{float:'right', marginTop:-6}} onClick={() => addContact(em)}>Add</Button>
        //                     </div>
        //                 </ListGroup.Item>
        //             ))}
        //         </div>
        //     );
        // }
    }

    /**
     * 
     * @returns html for every contact request you currently have
     */
    function DisplayRequests() {
        return (
            <div>
                {requests.map((req) => (
                    <ListGroup.Item>
                        <div><Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />{req}</div>
                        <div style={{ padding: 5 }}>
                            {' '}
                            <Button variant="success" onClick={() => acceptRequest(req)}>Accept</Button>{' '} <Button variant="danger" onClick={() => denyRequest(req)}>Deny</Button>{' '}
                        </div>
                    </ListGroup.Item>
                ))}
            </div>
        );
    }

    // const filteredData = data.filter((item) => {
    //     return item.name.toLowercase.includes(searchQuery.toLowerCase());
    // });

    return (
        <div className="pageLight">
            <div className="tabList">
                <Tabs
                    defaultActiveKey="first"
                    id="contacts-tabs"
                    className="mb-3"
                >
                    <Tab eventKey="first" title="Contacts">
                        <ListGroup>
                            <ContactDisplay />
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="second" title="Invites">
                        <ListGroup>
                            <DisplayRequests />
                        </ListGroup>
                    </Tab>
                </Tabs>
            </div>
            <Button variant="secondary" onClick={handleShow}>Add Contact</Button>{' '}
            <>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Add Friend</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Query the users database to find contact based on search input */}
                        <input type="text" placeholder="Search" style={{ marginTop: 20 }} onChange={handleSearchInputChange} />
                        <ListGroup style={{ marginTop: 15 }}>
                            <DisplayResults />
                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        </div>
    );
}

export default Contacts;