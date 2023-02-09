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
import User from "./ui/user/User";
import Groups from "./ui/groups/Groups";
import Events from "./ui/events/Events";
import Contacts from "./ui/contacts/Contacts";
import Settings from "./ui/settings/Settings";
import Calendar from '../src/ui/components/calendar.js'

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>}>
          </Route>
          <Route path="/user" element={<MainLayout><User /></MainLayout>} />
          <Route path="/groups" element={<MainLayout><Groups /></MainLayout>} />
          <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
          <Route path="/contacts" element={<MainLayout><Contacts /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
