import "./TeacherLogin.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert/dist/components/SweetAlert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const doTeacherLogin = () => {
    let url = process.env.REACT_APP_URL;

    let pattern = /\S+@\S+\.\S+/;
    let result = pattern.test(email);
    if (email === "" && password === "") {
      setAlert("Both fields are required");
    } else if (email === "") {
      setAlert("Email is required");
    } else if (password === "") {
      setAlert("password is required");
    } else if (!result) {
      setAlert("Enter a valid email");
    } else {
      try {
        let teacherData = {
          email,
          password
        };
        axios.post(`${url}/teacher/login`,teacherData).then((response) => {
          console.log(response);
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="main-div container">
      <div className="login shadow  bg-light rounded col-md-6 text-center">
        <h1>Teacher Login</h1>
        <Collapse in={open}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid email or password
          </Alert>
        </Collapse>
        <TextField
          margin="normal"
          required
          fullWidth
          name="Email"
          label="Email"
          type="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setOpen(false);
            setAlert("");
          }}
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
          onChange={(e) => {
            setPassword(e.target.value);
            setOpen(false);
            setAlert("");
          }}
          value={password}
          id="password"
        />
        {alert ? (
          <Alert className="mb-3" severity="error">
            {alert}
          </Alert>
        ) : (
          ""
        )}
        <button
          className="btn login-btn"
          onClick={() => {
            doTeacherLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
