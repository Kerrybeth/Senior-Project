import React, { useContext, useState, createContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getAuth, deleteUser, updateCurrentUser } from 'firebase/auth';
import { UserAuthContextProvider, useUserAuth } from "../auth/UserAuthContext";
import '../../App.css';

const Settings = () => {
  const {user, logOut} = useUserAuth();
  const [mySettings, setMySettings, error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setMySettings(event.target.value)
  }

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
  const update = async (e) => {
    e.preventDefault();
    setError("");
    try {
      updateCurrentUser(user.uid);
      navigate("/");
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
                  <Button variant="primary" type="submit" onClick={update}>Update Account</Button>{' '}
                  <Button variant="danger" type="submit" onClick={del}>Delete Account</Button>
              </div>
            </Tab>
            <Tab eventKey="second" title="Schedule Privacy">
              <div style={{padding:10}}>
                <Form>
                  <select value={mySettings} onChange={handleChange}>
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
