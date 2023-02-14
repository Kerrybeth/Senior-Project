import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import '../../App.css';

function Groups() {
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
                <ListGroup.Item>
                <div>
                <div className="fw-bold">Group 1</div>
                    Group description
                </div>
                </ListGroup.Item>
            </ListGroup>
            </Tab>
            <Tab eventKey="second" title="Invites">
            <ListGroup>
                <ListGroup.Item>You were invited to "Group 2" by Logan Tiraboschi 
                    <div style={{ padding:5 }}>
                        <Button variant="success">Accept</Button>{' '} <Button variant="danger">Deny</Button>{' '}
                    </div>
                </ListGroup.Item>
            </ListGroup>
            </Tab>
        </Tabs>
        </div>
        <Button variant="secondary">Create group</Button>{' '}
    </div>
    );
  }
  
  export default Groups;