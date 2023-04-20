import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, useTheme, Button } from "@mui/material";

function Reset() {
  const [email, setEmail] = useState("");
  const { user, error, loading, guest } = useSelector(
    (state) => state.user
  )

  const navigate = useNavigate();

  const sendPasswordReset = (email) => {/** to do later */
    console.log(email)

  }

  return (
    <Box mb="30px">
      <Typography variant="h1" sx={{ textAlign: "center", p: 1, m: 1 }}>
        CalandarBoard
      </Typography>
      <Typography variant="h3" sx={{ textAlign: "center", p: 1, m: 1 }}> Reset Your Password</Typography>
      <Box display={"grid"}>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          style={{width: "75%", margin: 3}}
        />
        <Button variant="contained" color="success" size="medium" sx={{ textAlign: "center", p: 1, width: "70%" }} onClick={() => navigate("/signup")}> Send password reset email</Button>

        <Button variant="primary" onClick={() => navigate("/signup")} sx={{ textAlign: "center", p: 1, m: 1 }}> Need An Account? Sign up</Button>
      </Box>
    </Box>
  );
}

export default Reset;