import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <div className="main-div container">
      <div className="login shadow  bg-light rounded col-md-6 text-center">
        <h1>Admin Login</h1>
        <TextField
          margin="normal"
          required
          fullWidth
          name="Email"
          label="Email"
          type="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="Email"
          required
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          required
          autoComplete="current-password"
        />
        <button className="btn login-btn">Login</button>
      </div>
    </div>
  );
}

export default Login;
