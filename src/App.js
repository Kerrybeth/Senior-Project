import Home from './ui/home/Home';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './ui/login/login';
import Signup from './ui/login/signup';
import { Routes, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider } from './ui/auth/UserAuthContext';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
