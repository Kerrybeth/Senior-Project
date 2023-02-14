import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Settings() {
  return (
    <Tabs>
      <Tab eventKey={first} title="Account Settings">
        <Row>
            <Col><Button type="button" class="btn btn-outline-primary">Change Username</Button></Col>
            <Col><Button type="button" class="btn btn-outline-primary">Change Password</Button></Col>
            <Col><Button type="button" class="btn btn-outline-primary">Delete Account</Button></Col>
        </Row>
      </Tab>
      <Tab eventKey={second} title="Schedule Privacy">
        <Row>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Friends"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Group Members"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="All Users"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />
                  <Form.Check
                  inline
                  label="Nobody"
                  name="group1"
                  type={type}
                  id={`inline-${type}-4`}
                />
              </div>
            ))}
          </Form>
        </Row>
      </Tab>
      <Tab eventKey={third} title="Theme">
        <Row>
          <Col><Typography variant="h5" style={{ color: 'black' }}> Theme </Typography></Col>
          <Form>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Light"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Dark"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
          </Form>
        </Row>
      </Tab>
    </Tabs>
  );
}

export default Settings; 
