import React, { useState, useContext, useEffect } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useUserAuth, userAuthContext } from '../auth/UserAuthContext';
import { getDatabase, ref, set, update, push, onValue} from "firebase/database";

import '../../App.css';
import { getAuth } from 'firebase/auth';

const Contacts = () => {
    // offcanvas stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // auth
    const user = getAuth().currentUser;

    // storage for db results
    let contactsTemp = [];
    let emailsTemp = [];
    const [contacts, setContacts] = useState([]);
    const [emails, setEmails] = useState([]);

    // db
    const db = getDatabase();

    useEffect(() => {
        onValue(ref(db, 'users/' + user.uid + '/contacts'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                for (let i = 0; i < childSnapshot.val().contacts.length; i++) {
                    if (user.user.uid == childSnapshot.val().contacts[i]) {
                        let name = childSnapshot.val().name;
                        
                        contactsTemp.push(name);
                    }
                }
            });
    
            setContacts(contactsTemp);
            contactsTemp = [];
        });
    }, [user]);

    /**
     * @returns listgroup of contacts
     */
    function contactDisplay() {
        return (
            <div>
                {contacts.map((em) => (
                    <ListGroup.Item>
                    <div style={{padding:5}}>
                        <Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />
                        {' '}{em}
                    </div>
                    </ListGroup.Item>
                ))}
            </div>
        );
    }

    // const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * deals with the search functionality of the add contact area
     * pulls from database a user email when query matches data in db
     * @param {*} event 
     */
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());

        onValue(ref(db, 'users/'), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (event.target.value.toLowerCase() == childSnapshot.child("profile").child("email").val()) {
                    let email = childSnapshot.child("profile").child("email").val();
                    
                    emailsTemp.push(email);
                }
            });

            setEmails(emailsTemp);
            emailsTemp = [];
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
                    <div style={{padding:5}}>
                        <Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" />
                        {' '}{em}
                        <Button style={{float:'right', marginTop:-6}}>Add</Button>
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
                <ListGroup.Item>
                <div><Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" /> Logan Tiraboschi</div>
                </ListGroup.Item>
            </ListGroup>
            </Tab>
            <Tab eventKey="second" title="Invites">
            <ListGroup>
                <ListGroup.Item>
                    <div><Image src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" roundedCircle className="listThumbnail" /> Kerrybeth Gorman has added you as a contact</div>
                    <div style={{ padding:5 }}>
                        <Button variant="success">Accept</Button>{' '} <Button variant="danger">Deny</Button>{' '}
                    </div>
                </ListGroup.Item>
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
                <input type="text" placeholder="Search" style={{marginTop:20}}onChange={handleSearchInputChange} />
                <ListGroup style={{marginTop:15}}>
                    <DisplayResults />
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    </div>
    );
  }
  
  export default Contacts;