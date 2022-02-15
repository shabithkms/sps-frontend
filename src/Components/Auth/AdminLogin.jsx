import './Login.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');

  const navigate = useNavigate();

  const doAdminLogin = () => {
    let pattern = /\S+@\S+\.\S+/;
    let result = pattern.test(email);
    if (email === '' && password === '') {
      setAlert('Both fields are required');
    } else if (email === '') {
      setAlert('Email is required');
    } else if (password === '') {
      setAlert('password is required');
    } else if (!result) {
      setAlert('Enter a valid email');
    } else {
      try {
        let ADMIN = process.env.REACT_APP_ADMIN;
        let PASSWORD = process.env.REACT_APP_PASSWORD;
        if (ADMIN === email) {
          if (PASSWORD === password) {
            let Admin = {
              ADMIN,
            };
            localStorage.setItem('admin', JSON.stringify(Admin));
            navigate('/admin');
          } else {
            setOpen(true);
          }
        } else {
          setOpen(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className='main-div container'>
      <div className='login shadow  bg-light rounded col-md-6 text-center'>
        <h1>Admin Login</h1>
        <Collapse in={open}>
          <Alert severity='error' sx={{ mb: 2 }}>
            Invalid email or password
          </Alert>
        </Collapse>
        <TextField
          margin='normal'
          required
          fullWidth
          name='Email'
          label='Email'
          type='Email'
          onChange={(e) => {
            setEmail(e.target.value);
            setOpen(false);
            setAlert('');
          }}
          value={email}
          id='Email'
        />

        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
            setOpen(false);
            setAlert('');
          }}
          value={password}
          id='password'
        />
        {alert ? (
          <Alert className='mb-3' severity='error'>
            {alert}
          </Alert>
        ) : (
          ''
        )}
        <button
          className='btn login-btn'
          onClick={() => {
            doAdminLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
