import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas'

import '../../App.css';

function Contacts() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <input type="text" placeholder="Search" />
            </Offcanvas.Body>
        </Offcanvas>
        </>
    </div>
    );
  }
  
  export default Contacts;