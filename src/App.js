import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./ui/layout+routes/MainLayout";
import routes from "./ui/layout+routes/Routes"

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './ui/login/login';
import Signup from './ui/login/signup';
import { Routes, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider } from './ui/auth/UserAuthContext';
import Error from "./ui/components/Error";

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
          <UserAuthContextProvider>
            <BrowserRouter>
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            </BrowserRouter>
          </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
