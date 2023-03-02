import React, { useContext, useState } from "react";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
              <div style={{padding:5}}>
                  <Button variant="primary" type="submit" onClick={update}>Update Account</Button>{' '}
                  <Button variant="danger" type="submit" onClick={del}>Delete Account</Button>
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
