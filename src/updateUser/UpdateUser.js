import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEmail, updatePassword } from 'firebase/auth';
import { useUserAuth } from "../ui/auth/UserAuthContext";
import Button from 'react-bootstrap/Button'
import '../App.css';

const UpdateUser = () => {
    const [newEmail, setEmail, newPassword, setPassword] = useState("");
    const navigate = useNavigate();
    const user = useUserAuth().user;
    
    const handleChange = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <div className="pageLight">
          <div className="tabList">
            <form onSubmit={handleChange}>
                <div style={{padding:5}}>
                    <label>Enter a new password:{'    '}   
                        <input
                            type="text" 
                            value={newPassword}
                            onChange={updateEmail(user, newEmail)}
                        />
                    </label>
                </div>
                <div style={{padding:5}}>
                    <label>Enter a new email address:{'    '}
                        <input
                            type="text" 
                            value={newEmail}
                            onChange={updatePassword(user, newPassword)}
                        />
                    </label>
                </div>
                <div style={{padding:5}}>
                    <Button varient="danger" type="submit" onClick={handleChange}>Submit</Button>
                </div>
            </form>
          </div>
        </div>
        
    );
}

export default UpdateUser;