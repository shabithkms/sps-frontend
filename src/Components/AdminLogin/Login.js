import "./Login.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const doLogin = () => {
    try {
      let ADMIN=process.env.REACT_APP_ADMIN
      let PASSWORD=process.env.REACT_APP_PASSWORD
      if(ADMIN===email){
        if(PASSWORD===password){
          let Admin={
            ADMIN
          }
          localStorage.setItem("Admin", JSON.stringify(Admin));
          navigate('/admin')
        }else{
          alert('Invalid password')
        }
      }else{
        alert('Invalid credentials')
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    
  
    return () => {
    
    };
  }, []);
  

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
        />
        <button
          className="btn login-btn"
          onClick={() => {
            doLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
