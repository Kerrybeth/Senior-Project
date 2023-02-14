import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Settings() {
            return (
              <Container>
                <Row>
                    <Col><Typography variant="h2" style={{ color: 'black' }}> Settings </Typography></Col>
                </Row>
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Schedule Privacy </Typography></Col>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                      <label class="form-check-label" for="inlineRadio1">Friends</label>
                      </input>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                      <label class="form-check-label" for="inlineRadio2">Group Members</label>
                      </input>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                      <label class="form-check-label" for="inlineRadio3">All Users</label>
                      </input>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4">
                      <label class="form-check-label" for="inlineRadio4">Nobody</label>
                      </input>
                    </div>
                </Row>
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Theme </Typography></Col>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                      <label class="form-check-label" for="flexSwitchCheckDefault">Dark</label>
                      </input>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                      <label class="form-check-label" for="flexSwitchCheckChecked">Light</label>
                      </input>
                    </div>
                </Row>
                <Row>
                    <Col><Typography variant="h3" style={{ color: 'black' }}> Account Settings </Typography></Col>
                    <button type="button" class="btn btn-primary">Change Username</button>
                    <button type="button" class="btn btn-primary">Change Password</button>
                    <button type="button" class="btn btn-primary">Delete Account</button>
                </Row>
              </Container>
            );
}

export default Settings; 