import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/layout+routes/MainLayout";
import routes from "./ui/layout+routes/Routes"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './ui/login/login';
import Signup from './ui/login/signup';
import Home from "./ui/home/Home";
import { Container, Row, Col } from "react-bootstrap";
import { UserAuthContextProvider } from './ui/auth/UserAuthContext';
import Error from "./ui/components/Error";

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
          <Route path="*" element={<Error />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
