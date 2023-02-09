import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Settings = () => {
    return (
        function AutoLayoutExample() {
            return (
              <Container>
                <Row>
                    <Col><Typography variant="h1" style={{ color: 'black' }}> Settings </Typography></Col>
                </Row>
                <Row>
                    <Col><Typography variant="h2" style={{ color: 'black' }}> Schedule Privacy </Typography></Col>
                    <button> Friends </button> 
                    <button> Group Members</button>
                    <button> All Users </button>
                    <button> Nobody </button>
                </Row>
                <Row>
                    <Col><Typography variant="h2" style={{ color: 'black' }}> Theme </Typography></Col>
                    <button> Light </button>
                    <button> Dark </button>
                </Row>
                <Row>
                    <Col><Typography variant="h2" style={{ color: 'black' }}> Account Settings </Typography></Col>
                    <button> Change Username </button>
                    <button> Change Password </button>
                    <button> Delete Account </button>
                </Row>
              </Container>
            );
          }
    );
}

export default Settings; 