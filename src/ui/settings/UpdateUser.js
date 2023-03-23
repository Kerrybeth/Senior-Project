import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { useUserAuth } from "../auth/UserAuthContext";
import '../../App.css';

const UpdateUser = () => {
    const [mySettings, setMySettings, setError, newEmail, setEmail, newPassword, setPassword] = useState("");
    const navigate = useNavigate();
    const user = useUserAuth().user;

    const handleChange = (event) => {
        setMySettings(event.target.value)
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="pageLight">
          <div className="tabList">
            <form onSubmit={handleSubmit}>
                <label>Enter a new password:
                    <input
                        type="text" 
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>    
                <label>Enter a new email address:
                    <input
                        type="text" 
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
          </div>
        </div>
        
    );
}

export default UpdateUser;