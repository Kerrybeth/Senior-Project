import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { deleteUser, getAuth, updateCurrentUser, updateEmail } from 'firebase/auth';
import { useUserAuth } from "../auth/UserAuthContext";
import '../../App.css';

const Settings = () => {
  const logOut = useUserAuth();
  const user = getAuth().currentUser;
  const [mySettings, setMySettings, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMySettings(event.target.value)
  };

  const del = async (e) => {
    e.preventDefault();
    setError("");
    try {
      deleteUser(user.uid);
      await logOut();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = async (e) => {
    //e.preventDefault();
    //setError("");
    alert(user.uid);
    try {
      updateEmail(user, "yes@tes.com");
        // {
        //   email: 'modifiedUser@example.com',
        //  // emailVerified: true,
        //   password: 'newPassword',
        //  // displayName: 'Jane Doe',
        //  // photoURL: 'http://www.example.com/12345678/photo.png',
        //  // disabled: true,
        // });
      
      navigate("/user");

    } catch (err) {
      setError(err.message);
    }
  };
    return (
      <div className="pageLight">
        <div className="tabList">
          <Tabs>
            <Tab eventKey="first" title="Account Settings">
              <div style={{padding:10}}>
                  <Button variant="primary" type="submit" onClick={updateUser}>Update Account</Button>{' '}
                  <Button variant="danger" type="submit" onClick={del}>Delete Account</Button>
              </div>
            </Tab>
            <Tab eventKey="second" title="Schedule Privacy">
              <div style={{padding:10}}>
                <label>Select Schedule Privacy: </label>
                <Form>
                  <select value={mySettings} defaultValue="Nobody" onChange={handleChange}>
                    <option value="Friends">Friends</option>
                    <option value="Group Members">Group Members</option>
                    <option value="All Users">All Users</option>
                    <option value="Nobody">Nobody</option>
                  </select>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
}

export default Settings; 
