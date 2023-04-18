import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEmail, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import { useUserAuth } from "../ui/auth/UserAuthContext";
import Button from 'react-bootstrap/Button'
import '../App.css';

const UpdateUser = () => {
    const [newEmail, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
    const navigate = useNavigate();
    const user = useUserAuth().user;
    
    const handlePassChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    };
    
    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };

    const handlePassSubmit = (e) => {
        reauthenticateWithCredential();
        updatePassword(user, newPassword);
        navigate("/");
    }

    const handleEmailSubmit = (e) => {
        reauthenticateWithCredential();
        updateEmail(user, newEmail);
        navigate("/");
    }

    return (
        <div className="pageLight">
          <div className="tabList">
            <h2>Change Password</h2>
            <form onSubmit={handlePassSubmit}>
                <div style={{padding:5}}>
                    <label>Enter a new password:{'    '}   
                        <input
                            type="password" 
                            value={newPassword}
                            onChange={handlePassChange}
                        />
                    </label>
                </div>
                <div style={{padding:5}}>
                    <Button varient="danger" type="submit">Submit</Button>
                </div>
            </form>
            <h2 style={{paddingTop:40}}>Change Email</h2>
            <form onSubmit={handleEmailSubmit}>
                <div style={{padding:5}}>
                    <label>Enter a new email address:{'    '}
                        <input
                            type="text" 
                            value={newEmail}
                            onChange={handleEmailChange}
                        />
                    </label>
                </div>
                <div style={{padding:5}}>
                    <Button varient="danger" type="submit">Submit</Button>
                </div>
            </form>
          </div>
        </div>
        
    );
}

export default UpdateUser;