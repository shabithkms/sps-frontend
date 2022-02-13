import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginPage from '../../Components/Auth/ReviewerLogin';

function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    let reviewer = JSON.parse(localStorage.getItem('reviewer'));
    console.log(reviewer);
    if (reviewer) {
      navigate('/reviewer');
    } else {
      navigate('/reviewer/login');
    }
  }, []);
  return (
    <div>
      <LoginPage    />
    </div>
  );
}

export default Login;
