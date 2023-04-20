import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Reset() {
  const [email, setEmail] = useState("");
  const { user, error, loading, guest } = useSelector(
    (state) => state.user
  )

  const navigate = useNavigate();

  const sendPasswordReset = (email) => {/** to do later */
    console.log(email)
  }

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) navigate("/");
  // }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>

        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;