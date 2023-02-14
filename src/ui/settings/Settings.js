import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../App.css';



function Settings() {
  return (
    <div className="pageLight">
      <div className="tabList">
        <Tabs>
          <Tab eventKey="first" title="Account Settings">
            <div style={{padding:5}}>
                <Button type="button" class="btn btn-outline-primary">Change Username</Button>
                <Button type="button" class="btn btn-outline-primary">Change Password</Button>
                <Button type="button" class="btn btn-outline-danger">Delete Account</Button>
            </div>
          </Tab>
          <Tab eventKey="second" title="Schedule Privacy">
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
          </Tab>
          <Tab eventKey="third" title="Theme">
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
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Settings; 
