import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Settings() {
            return (
              <Container>
                <Row>
                    <Col><Typography variant="h2" style={{ color: 'black' }}> Settings </Typography></Col>
                </Row>
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Schedule Privacy </Typography></Col>
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
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Theme </Typography></Col>
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
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Account Settings </Typography></Col>
                    <Button type="button" class="btn btn-primary">Change Username</Button>
                    <Button type="button" class="btn btn-primary">Change Password</Button>
                    <Button type="button" class="btn btn-primary">Delete Account</Button>
                </Row>
              </Container>
            );
}

export default Settings; 
